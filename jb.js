const TAG_ACTIVE_CLASS = 'tag--active';
const SEARCH_HIDDEN_CLASS = 'search--hidden';
const CLOSE_TAG_CLASS = 'close-tag';
const TAG_CLASS = 'tag';

const jobsListings = [
  {
    "id": 1,
    "company": "Swiss Tech ",
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": ["Kaduna"],
    "languages": ["HTML", "CSS", "JavaScript"]
  },
  {
    "id": 2,
    "company": "Webify",
    "position": "Graphic designer",
    "role": "Designer",
    "level": "Intermediate",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": ["Abuja"],
    "tools": ["Coreldraw"]
  },
  {
    "id": 3,
    "company": "Planet",
    "position": "UI/UX Designer",
    "role": "Designer",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": ["Abuja"],
    "tools": ["Figma", "Adobe XD"]
  },
  {
    "id": 4,
    "company": "Kanselor Vacancy",
    "position": "Receptionist",
    "role": "Receptionist",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Part Time ",
    "location": ["Lagos"],
    "languages": ["Accounting", "Shorthand"]
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "position": "Software Engineer",
    "role": "FullStack",
    "level": "Senior",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": ["Abeokuta"],
    "languages": ["C++"],
    "tools": ["Ruby", "Sass"]
  },
  {
    "id": 6,
    "company": "Storm",
    "position": " Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Part Time",
    "location": ["Abuja"],
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "position": "Web Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "3mo ago",
    "contract": "Full Time",
    "location": ["Kaduna"],
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Tech Lab",
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": ["Abuja"],
    "languages": ["JavaScript"],
    "tools": ["Vue, Sass"]
  },
  {
    "id": 9,
    "company": "Suzliz",
    "position": "School Teacher",
    "role": "Teacher",
    "level": "BSc",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": ["Lagos"],
    "languages": ["Commerce", "Economics"],
    
  },
  {
    "id": 10,
    "company": "Nula",
    "position": "Front-end Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1yr ago",
    "contract": "Full Time",
    "location": ["Abeokuta"],
    "languages": ["JavaScript"],
    "tools": ["React",]
  }
];

function getTagHTML(tag, tagClasses) {
    return `<span class="${tagClasses}">
                ${tag}
            </span>`;
}

function getJobListingHTML(jobData, filterTags = []) {
    const JOB_TAGS_PLACEHOLDER = '###JOB_TAGS###';
    let jobListingHTML = `
        <div class="jobs__item">
            <div class="jobs__column jobs__column--left">
                <div class="jobs__info">
                    <span class="jobs__company">${jobData.company}</span>
                    <span class="jobs__title">${jobData.position}</span>
                    
                    <ul class="jobs__details">
                        <li class="jobs__details-item">${jobData.postedAt}</li>
                        <li class="jobs__details-item">${jobData.contract}</li>
                    </ul>
                </div>
            </div>
            <div class="jobs__column jobs__column--right">
                ${JOB_TAGS_PLACEHOLDER}
            </div>
        </div>
    `;

    const tagsList = [
        jobData.role,
        jobData.level,
        ...(jobData.languages || []),
        ...(jobData.tools || []),
        ...(jobData.location || [])
    ];
    const tagsListLowercase = tagsList.map(t => t && t.toLowerCase());
    const passesFilter = !filterTags.length || filterTags.every(tag => (
        tagsListLowercase.includes(tag && tag.toLowerCase())
    ));
    
    if (!passesFilter) {
        return '';
    }

    const tagsString = tagsList.reduce((acc, currentTag) => {
        const activeClass = (filterTags.includes(currentTag) && TAG_ACTIVE_CLASS) || '';

        return acc + getTagHTML(currentTag, `${TAG_CLASS} ${activeClass}`);
    }, '');

    return jobListingHTML.replace(JOB_TAGS_PLACEHOLDER, tagsString);
};

function toggleClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);

        return;
    }
    
    el.classList.add(className);
}

function getSearchBarTags(tagValue, searchContentEl) {
    let searchBarTags = Array.from(searchContentEl.children)
        .map(node => node.innerHTML && node.innerHTML.trim())
        .filter(tag => !!tag);

    if (searchBarTags.includes(tagValue)) {
        searchBarTags = searchBarTags.filter(tag => tag !== tagValue);
    } else {
        searchBarTags = [...searchBarTags, tagValue];
    }

    return searchBarTags;
}

function setJobsListings(filterTags) {
    const jobsListingsHTML = jobsListings.reduce((acc, currentListing) => {
        return acc + getJobListingHTML(currentListing, filterTags);
    }, '');
    
    document.getElementById('jobs').innerHTML = jobsListingsHTML;
}

function displaySearchWrapper(display = false) {
    const searchWrapper = document.getElementById('search');
    
    if (display) {
        searchWrapper.classList.remove(SEARCH_HIDDEN_CLASS);

        return;
    }

    searchWrapper.classList.add(SEARCH_HIDDEN_CLASS);
}

function setSearchbarContent(searchContentEl, tags) {
    searchContentEl.innerHTML = tags.reduce((acc, currentTag) => {
        return acc + getTagHTML(currentTag, CLOSE_TAG_CLASS);
    }, '');
}

function resetState(searchContentEl) {
    searchContentEl.innerHTML = '';

    setJobsListings();
    displaySearchWrapper(false);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
}

window.addEventListener('click', (event) => {
    const targetEl = event.target;
    const targetText = targetEl.innerHTML.trim();
    const searchContentEl = document.getElementById('search-content');
    const searchBarTags = getSearchBarTags(targetText, searchContentEl);

    if (targetEl.id === 'clear' || !searchBarTags.length) {
        resetState(searchContentEl);

        return;
    }

    if (![TAG_CLASS, CLOSE_TAG_CLASS].some(c => targetEl.classList.contains(c))) {
        return;
    }

    setSearchbarContent(searchContentEl, searchBarTags);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
    displaySearchWrapper(searchBarTags.length > 0);
    setJobsListings(searchBarTags);
});

setJobsListings();