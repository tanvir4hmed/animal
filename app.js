const STORAGE_KEY = "animal-sounds-baby-state";
const CATEGORY_VISUAL_EXTENSIONS = ["gif", "webp", "jpg", "jpeg", "png"];
const ANIMAL_VISUAL_EXTENSIONS = ["gif", "webp"];
const AUDIO_EXTENSIONS = ["mp3", "wav", "ogg"];

const CATEGORY_META = {
  farm: {
    label: "Farm",
    palette: { start: "#f3d785", end: "#a7d39a", accent: "#507c2d" },
  },
  wild: {
    label: "Wild",
    palette: { start: "#edbf78", end: "#c88453", accent: "#874620" },
  },
  jungle: {
    label: "Jungle",
    palette: { start: "#6bbf86", end: "#215a4e", accent: "#dff5b0" },
  },
  birds: {
    label: "Birds",
    palette: { start: "#a4d8f8", end: "#5d91d2", accent: "#1f4e8c" },
  },
  pets: {
    label: "Pets",
    palette: { start: "#f3b69f", end: "#f18d78", accent: "#933d2e" },
  },
  insects: {
    label: "Insects",
    palette: { start: "#cfd96c", end: "#7ea04a", accent: "#445b1b" },
  },
  other: {
    label: "Other",
    palette: { start: "#7dbbd3", end: "#395974", accent: "#e8f7ff" },
  },
};

const CATEGORY_ORDER = ["farm", "wild", "jungle", "birds", "pets", "insects", "other"];

const ANIMALS = [
  { slug: "cow", name: "Cow", category: "farm" },
  { slug: "goat", name: "Goat", category: "farm" },
  { slug: "sheep", name: "Sheep", category: "farm" },
  { slug: "horse", name: "Horse", category: "farm" },
  { slug: "pig", name: "Pig", category: "farm" },
  { slug: "lion", name: "Lion", category: "wild" },
  { slug: "elephant", name: "Elephant", category: "wild" },
  { slug: "bear", name: "Bear", category: "wild" },
  { slug: "wolf", name: "Wolf", category: "wild" },
  { slug: "zebra", name: "Zebra", category: "wild" },
  { slug: "tiger", name: "Tiger", category: "jungle" },
  { slug: "monkey", name: "Monkey", category: "jungle" },
  { slug: "gorilla", name: "Gorilla", category: "jungle" },
  { slug: "snake", name: "Snake", category: "jungle" },
  { slug: "leopard", name: "Leopard", category: "jungle" },
  { slug: "chicken", name: "Chicken", category: "birds" },
  { slug: "duck", name: "Duck", category: "birds" },
  { slug: "owl", name: "Owl", category: "birds" },
  { slug: "parrot", name: "Parrot", category: "birds" },
  { slug: "rooster", name: "Rooster", category: "birds" },
  { slug: "dog", name: "Dog", category: "pets" },
  { slug: "cat", name: "Cat", category: "pets" },
  { slug: "rabbit", name: "Rabbit", category: "pets" },
  { slug: "hamster", name: "Hamster", category: "pets" },
  { slug: "canary", name: "Canary", category: "pets" },
  { slug: "bee", name: "Bee", category: "insects" },
  { slug: "cricket", name: "Cricket", category: "insects" },
  { slug: "grasshopper", name: "Grasshopper", category: "insects" },
  { slug: "mosquito", name: "Mosquito", category: "insects" },
  { slug: "cicada", name: "Cicada", category: "insects" },
  { slug: "rain", name: "Rain", category: "other" },
  { slug: "thunder", name: "Thunder", category: "other" },
  { slug: "wind", name: "Wind", category: "other" },
  { slug: "train", name: "Train", category: "other" },
  { slug: "bell", name: "Bell", category: "other" },
];

const state = {
  activeCategory: null,
};

const playback = {
  activeSlug: null,
  activeButton: null,
  audio: null,
};

let playSequence = 0;

const categoryView = document.querySelector("#categoryView");
const animalView = document.querySelector("#animalView");
const categoryGrid = document.querySelector("#categoryGrid");
const animalGrid = document.querySelector("#animalGrid");
const backButton = document.querySelector("#backButton");
const selectedCategoryTitle = document.querySelector("#selectedCategoryTitle");
const liveStatus = document.querySelector("#liveStatus");
const categoryCardTemplate = document.querySelector("#categoryCardTemplate");
const animalCardTemplate = document.querySelector("#animalCardTemplate");

restoreState();
attachEvents();
renderCategoryHome();

if (state.activeCategory && CATEGORY_META[state.activeCategory]) {
  openCategory(state.activeCategory, { skipPersist: true });
} else {
  showHome({ skipPersist: true });
}

function attachEvents() {
  backButton.addEventListener("click", () => {
    showHome();
  });
}

function renderCategoryHome() {
  categoryGrid.innerHTML = "";

  CATEGORY_ORDER.forEach((categoryId) => {
    const meta = CATEGORY_META[categoryId];
    const fragment = categoryCardTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".category-card__button");
    const image = fragment.querySelector(".category-card__image");
    const name = fragment.querySelector(".category-card__name");

    name.textContent = meta.label;
    image.alt = `${meta.label} category`;
    loadCategoryVisual(image, categoryId, meta);

    button.addEventListener("click", () => {
      openCategory(categoryId);
    });

    categoryGrid.append(fragment);
  });
}

function openCategory(categoryId, { skipPersist = false } = {}) {
  const meta = CATEGORY_META[categoryId];

  if (!meta) {
    return;
  }

  stopCurrentPlayback({ announce: false });
  state.activeCategory = categoryId;
  selectedCategoryTitle.textContent = meta.label;
  categoryView.hidden = true;
  animalView.hidden = false;
  renderAnimalGrid(categoryId);
  announce(`${meta.label} category opened.`);

  if (!skipPersist) {
    persistState();
  }
}

function showHome({ skipPersist = false } = {}) {
  stopCurrentPlayback({ announce: false });
  state.activeCategory = null;
  animalView.hidden = true;
  categoryView.hidden = false;
  announce("Category screen.");

  if (!skipPersist) {
    persistState();
  }
}

function renderAnimalGrid(categoryId) {
  animalGrid.innerHTML = "";

  ANIMALS.filter((animal) => animal.category === categoryId).forEach((animal) => {
    const fragment = animalCardTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".animal-card__button");
    const image = fragment.querySelector(".animal-card__image");
    const name = fragment.querySelector(".animal-card__name");

    name.textContent = animal.name;
    image.alt = animal.name;
    loadAnimalVisual(image, animal);

    button.addEventListener("click", () => {
      handlePlayClick(animal, button);
    });

    animalGrid.append(fragment);
  });
}

function loadCategoryVisual(imageElement, categoryId, meta) {
  loadImageWithFallback(
    imageElement,
    buildFileCandidates(`assets/categories/${categoryId}`, CATEGORY_VISUAL_EXTENSIONS),
    buildCategoryFallbackArtwork(categoryId, meta)
  );
}

function loadAnimalVisual(imageElement, animal) {
  loadImageWithFallback(
    imageElement,
    buildFileCandidates(`assets/gifs/${animal.slug}`, ANIMAL_VISUAL_EXTENSIONS),
    buildAnimalFallbackArtwork(animal)
  );
}

function loadImageWithFallback(imageElement, candidates, fallbackSrc) {
  let index = 0;

  const tryNext = () => {
    if (index >= candidates.length) {
      imageElement.onerror = null;
      imageElement.src = fallbackSrc;
      return;
    }

    imageElement.src = candidates[index];
    index += 1;
  };

  imageElement.onerror = tryNext;
  tryNext();
}

function buildFileCandidates(basePath, extensions) {
  return extensions.map((extension) => `${basePath}.${extension}`);
}

function buildCategoryFallbackArtwork(categoryId, meta) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${escapeXml(
      meta.label
    )}">
      <defs>
        <linearGradient id="bg-${escapeXml(categoryId)}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${meta.palette.start}" />
          <stop offset="100%" stop-color="${meta.palette.end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg-${escapeXml(categoryId)})" />
      <circle cx="670" cy="130" r="120" fill="rgba(255,255,255,0.18)" />
      <circle cx="115" cy="520" r="150" fill="rgba(255,255,255,0.16)" />
      <text x="400" y="290" text-anchor="middle" font-family="Trebuchet MS, Arial, sans-serif" font-size="108" font-weight="700" fill="rgba(255,251,245,0.96)">${escapeXml(
        meta.label
      )}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildAnimalFallbackArtwork(animal) {
  const meta = CATEGORY_META[animal.category];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${escapeXml(
      animal.name
    )}">
      <defs>
        <linearGradient id="bg-${escapeXml(animal.slug)}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${meta.palette.start}" />
          <stop offset="100%" stop-color="${meta.palette.end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg-${escapeXml(animal.slug)})" />
      <circle cx="670" cy="130" r="120" fill="rgba(255,255,255,0.18)" />
      <circle cx="115" cy="520" r="150" fill="rgba(255,255,255,0.16)" />
      <text x="400" y="285" text-anchor="middle" font-family="Trebuchet MS, Arial, sans-serif" font-size="104" font-weight="700" fill="rgba(255,251,245,0.96)">${escapeXml(
        animal.name
      )}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function handlePlayClick(animal, button) {
  const isSameAnimal = playback.activeSlug === animal.slug;
  playSequence += 1;
  const currentSequence = playSequence;

  stopCurrentPlayback({ announce: false });

  if (isSameAnimal) {
    announce(`${animal.name} stopped.`);
    return;
  }

  playback.activeSlug = animal.slug;
  playback.activeButton = button;
  button.classList.add("is-playing");
  announce(`${animal.name} sound.`);

  playAudioIfAvailable(animal, currentSequence).then((playedAudio) => {
    if (currentSequence !== playSequence) {
      return;
    }

    if (!playedAudio) {
      stopCurrentPlayback({ announce: false });
      announce(`${animal.name} sound file missing.`);
    }
  });
}

function playAudioIfAvailable(animal, sequence) {
  const sources = buildFileCandidates(`assets/sounds/${animal.slug}`, AUDIO_EXTENSIONS);

  return new Promise((resolve) => {
    const audio = new Audio();
    let index = 0;
    let timeoutId = null;

    const clearAttempt = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      audio.removeEventListener("loadeddata", handleLoaded);
      audio.removeEventListener("error", handleError);
    };

    const finish = (didPlay) => {
      clearAttempt();
      if (!didPlay) {
        audio.pause();
        audio.src = "";
      }
      resolve(didPlay);
    };

    const tryNext = () => {
      clearAttempt();

      if (sequence !== playSequence) {
        finish(false);
        return;
      }

      if (index >= sources.length) {
        finish(false);
        return;
      }

      audio.addEventListener("loadeddata", handleLoaded, { once: true });
      audio.addEventListener("error", handleError, { once: true });
      audio.src = sources[index];
      index += 1;
      audio.load();

      timeoutId = window.setTimeout(() => {
        tryNext();
      }, 900);
    };

    const handleLoaded = async () => {
      clearAttempt();

      if (sequence !== playSequence) {
        finish(false);
        return;
      }

      try {
        playback.audio = audio;
        audio.onended = () => {
          if (sequence === playSequence) {
            stopCurrentPlayback({ announce: false });
            announce(`${animal.name} done.`);
          }
        };
        await audio.play();
        resolve(true);
      } catch {
        finish(false);
      }
    };

    const handleError = () => {
      tryNext();
    };

    tryNext();
  });
}

function stopCurrentPlayback({ announce }) {
  if (playback.audio) {
    playback.audio.pause();
    playback.audio.currentTime = 0;
    playback.audio.src = "";
    playback.audio = null;
  }

  if (playback.activeButton) {
    playback.activeButton.classList.remove("is-playing");
  }

  playback.activeSlug = null;
  playback.activeButton = null;

  if (announce) {
    liveStatus.textContent = "Sound stopped.";
  }
}

function persistState() {
  const nextState = {
    activeCategory: state.activeCategory,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function restoreState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return;
  }

  try {
    const stored = JSON.parse(raw);
    if (stored.activeCategory && CATEGORY_META[stored.activeCategory]) {
      state.activeCategory = stored.activeCategory;
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function announce(message) {
  liveStatus.textContent = message;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
