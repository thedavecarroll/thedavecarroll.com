import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface TestSummary {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: string;
  output: string[];
  errors: string[];
}

interface SuiteSummary {
  suite: string;
  tests: TestSummary[];
}

interface ReportSummary {
  timestamp: string;
  duration: string;
  passed: number;
  failed: number;
  skipped: number;
  suites: SuiteSummary[];
}

class SummaryReporter implements Reporter {
  private suiteMap: Map<string, SuiteSummary> = new Map();
  private startTime: number = 0;

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = Date.now();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const suiteName = test.parent.title;

    if (!this.suiteMap.has(suiteName)) {
      this.suiteMap.set(suiteName, { suite: suiteName, tests: [] });
    }

    const currentSuite = this.suiteMap.get(suiteName)!;

    const output: string[] = [];
    for (const entry of result.stdout) {
      if (typeof entry === 'string') {
        output.push(entry.trim());
      } else if (Buffer.isBuffer(entry)) {
        output.push(entry.toString().trim());
      }
    }

    const errors: string[] = [];
    for (const error of result.errors) {
      if (error.message) {
        // Extract just the first line of error message
        const firstLine = error.message.split('\n')[0];
        errors.push(firstLine);
      }
    }

    currentSuite.tests.push({
      name: test.title,
      status: result.status as 'passed' | 'failed' | 'skipped',
      duration: `${(result.duration / 1000).toFixed(2)}s`,
      output: output.filter(o => o.length > 0),
      errors,
    });
  }

  onEnd(result: FullResult) {
    const totalDuration = Date.now() - this.startTime;
    const suites = Array.from(this.suiteMap.values());

    let passed = 0, failed = 0, skipped = 0;
    for (const suite of suites) {
      for (const test of suite.tests) {
        if (test.status === 'passed') passed++;
        else if (test.status === 'failed') failed++;
        else if (test.status === 'skipped') skipped++;
      }
    }

    const summary: ReportSummary = {
      timestamp: new Date().toISOString(),
      duration: `${(totalDuration / 1000).toFixed(2)}s`,
      passed,
      failed,
      skipped,
      suites,
    };

    const outputDir = './test-results';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, 'results.json'),
      JSON.stringify(summary, null, 2)
    );
  }
}

export default SummaryReporter;
