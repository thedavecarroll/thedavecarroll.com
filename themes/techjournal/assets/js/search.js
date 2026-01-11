// Search functionality for TechJournal theme

let searchIndex = [];
let searchInput, searchResults, searchStats, noResults, searchTerms, searchTermsWrapper, searchClear, searchHelpToggle, searchHelp;
let currentTerms = [];

function initSearch(indexUrl) {
  searchInput = document.getElementById('search-input');
  searchResults = document.getElementById('search-results');
  searchStats = document.getElementById('search-stats');
  noResults = document.getElementById('no-results');
  searchTerms = document.getElementById('search-terms');
  searchTermsWrapper = document.getElementById('search-terms-wrapper');
  searchClear = document.getElementById('search-clear');

  // Clear button handler
  if (searchClear) {
    searchClear.addEventListener('click', clearAllTerms);
  }

  // Help tooltip
  searchHelpToggle = document.getElementById('search-help-toggle');
  searchHelp = document.getElementById('search-help');

  if (searchHelpToggle && searchHelp) {
    searchHelpToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      searchHelp.classList.toggle('tj-search__help--open');
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!searchHelp.contains(e.target) && !searchHelpToggle.contains(e.target)) {
        searchHelp.classList.remove('tj-search__help--open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchHelp.classList.remove('tj-search__help--open');
      }
    });
  }

  // Load the search index
  fetch(indexUrl)
    .then(response => response.json())
    .then(data => {
      searchIndex = data;
      // Check for query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        searchInput.value = query;
        performSearch(query);
      }
    })
    .catch(error => console.error('Error loading search index:', error));

  // Add input event listener
  searchInput.addEventListener('input', debounce(function(e) {
    const query = e.target.value.trim();
    if (query.length >= 2) {
      performSearch(query);
      // Update URL without reload
      const url = new URL(window.location);
      url.searchParams.set('q', query);
      window.history.replaceState({}, '', url);
    } else {
      currentTerms = [];
      renderTermTags();
      clearResults();
    }
  }, 300));
}

function parseSearchQuery(query) {
  const terms = [];
  // Match: -"phrase", -word, "phrase", OR, |, or word
  const regex = /(-?"[^"]+"|OR|\||[^\s]+)/g;
  let match;
  let nextIsOr = false;

  while ((match = regex.exec(query)) !== null) {
    let token = match[1];

    // Handle OR operator
    if (token === 'OR' || token === '|') {
      nextIsOr = true;
      continue;
    }

    // Check for NOT prefix
    const isNot = token.startsWith('-');
    if (isNot) {
      token = token.substring(1);
    }

    // Check for quoted phrase
    const isPhrase = token.startsWith('"') && token.endsWith('"');
    if (isPhrase) {
      token = token.slice(1, -1);
    }

    const termValue = token.toLowerCase();
    if (termValue.length >= 2) {
      terms.push({
        value: termValue,
        isPhrase: isPhrase,
        isNot: isNot,
        isOr: nextIsOr
      });
      nextIsOr = false;
    }
  }

  return terms;
}

function performSearch(query) {
  const terms = parseSearchQuery(query);
  currentTerms = terms;
  renderTermTags();

  if (terms.length === 0) {
    clearResults();
    return;
  }

  // Separate terms into groups: required (AND), excluded (NOT), and OR groups
  const requiredTerms = [];
  const excludedTerms = [];
  const orGroups = [[]]; // Array of arrays for OR groups

  terms.forEach(term => {
    if (term.isNot) {
      excludedTerms.push(term);
    } else if (term.isOr && orGroups[orGroups.length - 1].length > 0) {
      // Add to current OR group
      orGroups[orGroups.length - 1].push(term);
    } else if (term.isOr) {
      // First term marked as OR connects to previous required term
      if (requiredTerms.length > 0) {
        const prevTerm = requiredTerms.pop();
        orGroups[orGroups.length - 1].push(prevTerm, term);
      } else {
        requiredTerms.push(term);
      }
    } else {
      // Start new OR group if previous was an OR group with items
      if (orGroups[orGroups.length - 1].length > 0) {
        orGroups.push([]);
      }
      requiredTerms.push(term);
    }
  });

  // Clean up empty OR groups and move single-item groups to required
  const validOrGroups = orGroups.filter(group => group.length > 1);
  orGroups.filter(group => group.length === 1).forEach(group => {
    requiredTerms.push(group[0]);
  });

  const results = [];

  searchIndex.forEach(item => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const contentLower = (item.content || '').toLowerCase();
    const summaryLower = (item.summary || '').toLowerCase();
    const tags = (item.tags || []).map(t => t.toLowerCase());

    // Helper to check if a term matches
    function termMatches(term) {
      const termValue = term.value;
      return titleLower.includes(termValue) ||
             tags.some(tag => tag.includes(termValue)) ||
             summaryLower.includes(termValue) ||
             contentLower.includes(termValue);
    }

    // Helper to calculate score for a term
    function scoreForTerm(term) {
      const termValue = term.value;
      let s = 0;
      if (titleLower.includes(termValue)) {
        s += 10;
        if (titleLower.startsWith(termValue)) s += 5;
      }
      if (tags.some(tag => tag.includes(termValue))) s += 5;
      if (summaryLower.includes(termValue)) s += 3;
      if (contentLower.includes(termValue)) s += 1;
      return s;
    }

    // Check excluded terms first - if any match, skip this item
    for (const term of excludedTerms) {
      if (termMatches(term)) {
        return; // Skip this item
      }
    }

    // Check all required terms must match
    for (const term of requiredTerms) {
      if (!termMatches(term)) {
        return; // Skip this item
      }
      score += scoreForTerm(term);
    }

    // Check OR groups - at least one term in each group must match
    for (const group of validOrGroups) {
      let groupMatches = false;
      for (const term of group) {
        if (termMatches(term)) {
          groupMatches = true;
          score += scoreForTerm(term);
        }
      }
      if (!groupMatches) {
        return; // Skip this item
      }
    }

    if (score > 0) {
      results.push({ item, score });
    }
  });

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  displayResults(results, terms);
}

function displayResults(results, terms) {
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchStats.textContent = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  searchStats.textContent = `Found ${results.length} result${results.length === 1 ? '' : 's'}`;

  results.forEach(({ item }) => {
    const resultEl = document.createElement('article');
    resultEl.className = 'tj-search__result';

    const title = highlightTerms(item.title, terms);
    const summary = highlightTerms(item.summary || '', terms);

    // Build tags HTML with highlighting
    let tagsHtml = '';
    if (item.tags && item.tags.length > 0) {
      const tagLinks = item.tags.map(tag => {
        const highlightedTag = highlightTerms(tag, terms);
        return `<a href="/tags/${tag.toLowerCase().replace(/\s+/g, '-')}/" class="tj-search__result-tag">${highlightedTag}</a>`;
      }).join('');
      tagsHtml = `<div class="tj-search__result-tags">${tagLinks}</div>`;
    }

    resultEl.innerHTML = `
      <h2 class="tj-search__result-title">
        <a href="${item.url}">${title}</a>
      </h2>
      <p class="tj-search__result-excerpt">${summary}</p>
      ${tagsHtml}
      <div class="tj-search__result-meta">
        <span>${item.date}</span>
        ${item.section ? `<span>${item.section}</span>` : ''}
      </div>
    `;

    searchResults.appendChild(resultEl);
  });
}

function highlightTerms(text, terms) {
  if (!text) return '';
  let result = escapeHtml(text);

  // Sort terms by length descending to highlight longer phrases first
  const sortedTerms = [...terms].sort((a, b) => b.value.length - a.value.length);

  sortedTerms.forEach(term => {
    const regex = new RegExp(`(${escapeRegex(term.value)})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });

  return result;
}

function renderTermTags() {
  if (!searchTerms) return;
  searchTerms.innerHTML = '';

  // Show/hide the wrapper based on whether there are terms
  if (searchTermsWrapper) {
    searchTermsWrapper.style.display = currentTerms.length > 0 ? 'flex' : 'none';
  }

  currentTerms.forEach((term, index) => {
    const tag = document.createElement('span');
    let className = 'tj-search__term';
    if (term.isNot) className += ' tj-search__term--not';
    else if (term.isOr) className += ' tj-search__term--or';
    else if (term.isPhrase) className += ' tj-search__term--phrase';
    tag.className = className;

    // Add operator prefix if applicable
    if (term.isNot) {
      const op = document.createElement('span');
      op.className = 'tj-search__term-operator';
      op.textContent = 'NOT';
      tag.appendChild(op);
    } else if (term.isOr) {
      const op = document.createElement('span');
      op.className = 'tj-search__term-operator';
      op.textContent = 'OR';
      tag.appendChild(op);
    }

    const text = document.createElement('span');
    text.className = 'tj-search__term-value';
    text.textContent = term.isPhrase ? `"${term.value}"` : term.value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'tj-search__term-remove';
    removeBtn.setAttribute('aria-label', `Remove ${term.value}`);
    removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    removeBtn.addEventListener('click', () => removeTerm(index));

    tag.appendChild(text);
    tag.appendChild(removeBtn);
    searchTerms.appendChild(tag);
  });
}

function removeTerm(index) {
  // Rebuild the query string without this term
  const newQuery = currentTerms
    .filter((_, i) => i !== index)
    .map(t => {
      let str = '';
      if (t.isNot) str += '-';
      else if (t.isOr) str += 'OR ';
      if (t.isPhrase) str += `"${t.value}"`;
      else str += t.value;
      return str;
    })
    .join(' ');

  searchInput.value = newQuery;

  // Update URL
  const url = new URL(window.location);
  if (newQuery) {
    url.searchParams.set('q', newQuery);
  } else {
    url.searchParams.delete('q');
  }
  window.history.replaceState({}, '', url);

  // Re-run search
  if (newQuery.length >= 2) {
    performSearch(newQuery);
  } else {
    currentTerms = [];
    renderTermTags();
    clearResults();
  }
}

function clearAllTerms() {
  searchInput.value = '';
  currentTerms = [];
  renderTermTags();
  clearResults();

  // Update URL
  const url = new URL(window.location);
  url.searchParams.delete('q');
  window.history.replaceState({}, '', url);

  // Focus the input
  searchInput.focus();
}

function clearResults() {
  searchResults.innerHTML = '';
  searchStats.textContent = '';
  noResults.style.display = 'none';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
