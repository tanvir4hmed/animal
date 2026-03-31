const STORAGE_KEY = "animal-sounds-baby-state";
const OPENVERSE_BASE = "https://api.openverse.org/v1";
const LOCAL_CATEGORY_EXTENSIONS = ["gif", "webp", "jpg", "jpeg", "png"];
const LOCAL_ANIMAL_EXTENSIONS = ["gif", "webp", "jpg", "jpeg", "png"];
const LOCAL_SOUND_EXTENSIONS = ["mp3", "wav", "ogg"];

const CATEGORY_META = {
  farm: { label: "Farm", coverQuery: "farm animals" },
  wild: { label: "Wild", coverQuery: "wild animals" },
  jungle: { label: "Jungle", coverQuery: "jungle animals" },
  birds: { label: "Birds", coverQuery: "birds" },
  pets: { label: "Pets", coverQuery: "pets" },
  insects: { label: "Insects", coverQuery: "insects" },
};

const CATEGORY_ORDER = ["farm", "wild", "jungle", "birds", "pets", "insects"];

const CATEGORY_ITEMS = {
  farm: [
    ["cow", "Cow", "cow", "cow moo"],
    ["horse", "Horse", "horse", "horse neigh"],
    ["sheep", "Sheep", "sheep", "sheep bleat"],
    ["goat", "Goat", "goat", "goat bleat"],
    ["pig", "Pig", "pig", "pig oink"],
    ["chicken", "Chicken", "chicken", "chicken cluck"],
    ["rooster", "Rooster", "rooster", "rooster crow"],
    ["donkey", "Donkey", "donkey", "donkey bray"],
    ["buffalo", "Buffalo", "buffalo animal", "buffalo sound"],
    ["turkey", "Turkey", "turkey bird", "turkey gobble"],
  ],
  wild: [
    ["lion", "Lion", "lion animal", "lion roar"],
    ["elephant", "Elephant", "elephant animal", "elephant trumpet"],
    ["zebra", "Zebra", "zebra animal", "zebra sound"],
    ["giraffe", "Giraffe", "giraffe animal", "giraffe sound"],
    ["bear", "Bear", "bear animal", "bear growl"],
    ["wolf", "Wolf", "wolf animal", "wolf howl"],
    ["fox", "Fox", "fox animal", "fox bark"],
    ["deer", "Deer", "deer animal", "deer sound"],
    ["rhino", "Rhino", "rhinoceros animal", "rhino sound"],
    ["hippo", "Hippo", "hippopotamus animal", "hippo sound"],
  ],
  jungle: [
    ["tiger", "Tiger", "tiger animal", "tiger roar"],
    ["monkey", "Monkey", "monkey animal", "monkey call"],
    ["gorilla", "Gorilla", "gorilla animal", "gorilla sound"],
    ["leopard", "Leopard", "leopard animal", "leopard growl"],
    ["jaguar", "Jaguar", "jaguar animal", "jaguar roar"],
    ["crocodile", "Crocodile", "crocodile animal", "crocodile sound"],
    ["snake", "Snake", "snake animal", "snake hiss"],
    ["chimpanzee", "Chimpanzee", "chimpanzee animal", "chimpanzee call"],
    ["toucan", "Toucan", "toucan bird", "toucan call"],
    ["orangutan", "Orangutan", "orangutan animal", "orangutan call"],
  ],
  birds: [
    ["owl", "Owl", "owl bird", "owl hoot"],
    ["parrot", "Parrot", "parrot bird", "parrot squawk"],
    ["duck", "Duck", "duck bird", "duck quack"],
    ["crow", "Crow", "crow bird", "crow caw"],
    ["eagle", "Eagle", "eagle bird", "eagle call"],
    ["sparrow", "Sparrow", "sparrow bird", "sparrow chirp"],
    ["pigeon", "Pigeon", "pigeon bird", "pigeon coo"],
    ["peacock", "Peacock", "peacock bird", "peacock call"],
    ["goose", "Goose", "goose bird", "goose honk"],
    ["swan", "Swan", "swan bird", "swan sound"],
  ],
  pets: [
    ["dog", "Dog", "dog pet", "dog bark"],
    ["cat", "Cat", "cat pet", "cat meow"],
    ["rabbit", "Rabbit", "rabbit pet", "rabbit sound"],
    ["hamster", "Hamster", "hamster pet", "hamster squeak"],
    ["guinea-pig", "Guinea Pig", "guinea pig pet", "guinea pig sound"],
    ["parakeet", "Parakeet", "parakeet bird", "parakeet chirp"],
    ["canary", "Canary", "canary bird", "canary chirp"],
    ["cockatiel", "Cockatiel", "cockatiel bird", "cockatiel sound"],
    ["budgie", "Budgie", "budgie bird", "budgie chirp"],
    ["lovebird", "Lovebird", "lovebird bird", "lovebird sound"],
  ],
  insects: [
    ["bee", "Bee", "bee insect", "bee buzz"],
    ["cricket", "Cricket", "cricket insect", "cricket chirp"],
    ["mosquito", "Mosquito", "mosquito insect", "mosquito buzz"],
    ["cicada", "Cicada", "cicada insect", "cicada sound"],
    ["grasshopper", "Grasshopper", "grasshopper insect", "grasshopper sound"],
    ["fly", "Fly", "fly insect", "fly buzz"],
    ["wasp", "Wasp", "wasp insect", "wasp buzz"],
    ["hornet", "Hornet", "hornet insect", "hornet buzz"],
    ["beetle", "Beetle", "beetle insect", "beetle sound"],
    ["locust", "Locust", "locust insect", "locust sound"],
  ],
};

const ANIMALS = Object.entries(CATEGORY_ITEMS).flatMap(([category, items]) =>
  items.map(([slug, name, imageQuery, audioQuery]) => ({
    slug,
    name,
    category,
    imageQuery,
    audioQuery,
  }))
);

const imageCache = new Map();
const audioCache = new Map();

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
  warmCategoryCache(categoryId);
  announce(`${meta.label} category.`);

  if (!skipPersist) {
    persistState();
  }
}

function showHome({ skipPersist = false } = {}) {
  stopCurrentPlayback({ announce: false });
  state.activeCategory = null;
  animalView.hidden = true;
  categoryView.hidden = false;
  announce("Categories.");

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

function warmCategoryCache(categoryId) {
  const meta = CATEGORY_META[categoryId];
  const animals = ANIMALS.filter((animal) => animal.category === categoryId);

  void getImageForQuery(meta.coverQuery);
  animals.forEach((animal) => {
    void getImageForQuery(animal.imageQuery);
    void getAudioSourcesForQuery(animal.audioQuery);
  });
}

function loadCategoryVisual(imageElement, categoryId, meta) {
  const fallback = buildCategoryFallbackArtwork(meta);
  imageElement.src = fallback;

  void applyBestImage(
    imageElement,
    buildFileCandidates(`assets/categories/${categoryId}`, LOCAL_CATEGORY_EXTENSIONS),
    meta.coverQuery,
    fallback
  );
}

function loadAnimalVisual(imageElement, animal) {
  const fallback = buildAnimalFallbackArtwork(animal);
  imageElement.src = fallback;

  void applyBestImage(
    imageElement,
    buildFileCandidates(`assets/gifs/${animal.slug}`, LOCAL_ANIMAL_EXTENSIONS),
    animal.imageQuery,
    fallback
  );
}

async function applyBestImage(imageElement, localCandidates, remoteQuery, fallbackSrc) {
  const localUrl = await findFirstLoadableImage(localCandidates);

  if (localUrl) {
    imageElement.src = localUrl;
    return;
  }

  const remote = await getImageForQuery(remoteQuery);

  if (remote?.url) {
    imageElement.src = remote.url;
    return;
  }

  imageElement.src = fallbackSrc;
}

async function findFirstLoadableImage(candidates) {
  for (const url of candidates) {
    if (await canLoadImage(url)) {
      return url;
    }
  }

  return null;
}

function canLoadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    const finish = (value) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(value);
    };

    const timeoutId = window.setTimeout(() => finish(false), 3000);

    img.onload = () => {
      window.clearTimeout(timeoutId);
      finish(true);
    };

    img.onerror = () => {
      window.clearTimeout(timeoutId);
      finish(false);
    };

    img.src = url;
  });
}

async function getImageForQuery(query) {
  if (imageCache.has(query)) {
    return imageCache.get(query);
  }

  const endpoint = `${OPENVERSE_BASE}/images/?q=${encodeURIComponent(
    query
  )}&license_type=commercial&page_size=1`;

  try {
    const response = await fetch(endpoint, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      imageCache.set(query, null);
      return null;
    }

    const data = await response.json();
    const result = data.results?.[0];
    const media = result
      ? {
          url: result.thumbnail || result.url,
          sourceUrl: result.foreign_landing_url || result.url,
          creator: result.creator,
          license: result.license,
          source: result.source,
        }
      : null;

    imageCache.set(query, media);
    return media;
  } catch {
    imageCache.set(query, null);
    return null;
  }
}

async function getAudioSourcesForQuery(query) {
  if (audioCache.has(query)) {
    return audioCache.get(query);
  }

  const endpoint = `${OPENVERSE_BASE}/audio/?q=${encodeURIComponent(
    query
  )}&license_type=commercial&page_size=5`;

  try {
    const response = await fetch(endpoint, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      audioCache.set(query, []);
      return [];
    }

    const data = await response.json();
    const sources = (data.results || [])
      .filter((result) => result.url)
      .map((result) => ({
        type: "audio",
        url: result.url,
        sourceUrl: result.foreign_landing_url || result.url,
        creator: result.creator,
        license: result.license,
        source: result.source,
      }));

    audioCache.set(query, sources);
    return sources;
  } catch {
    audioCache.set(query, []);
    return [];
  }
}

function buildFileCandidates(basePath, extensions) {
  return extensions.map((extension) => `${basePath}.${extension}`);
}

function buildCategoryFallbackArtwork(meta) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${escapeXml(
      meta.label
    )}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f6d89f" />
          <stop offset="100%" stop-color="#8bc9c0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" />
      <text x="400" y="315" text-anchor="middle" font-family="Trebuchet MS, Arial, sans-serif" font-size="108" font-weight="700" fill="rgba(255,251,245,0.96)">${escapeXml(
        meta.label
      )}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildAnimalFallbackArtwork(animal) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${escapeXml(
      animal.name
    )}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f6d89f" />
          <stop offset="100%" stop-color="#8bc9c0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" />
      <text x="400" y="315" text-anchor="middle" font-family="Trebuchet MS, Arial, sans-serif" font-size="98" font-weight="700" fill="rgba(255,251,245,0.96)">${escapeXml(
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
  announce(`${animal.name}.`);

  void playMediaIfAvailable(animal, currentSequence).then((played) => {
    if (currentSequence !== playSequence) {
      return;
    }

    if (!played) {
      stopCurrentPlayback({ announce: false });
      announce(`${animal.name} sound missing.`);
    }
  });
}

async function playMediaIfAvailable(animal, sequence) {
  const remoteSources = await getAudioSourcesForQuery(animal.audioQuery);
  const sources = [
    ...buildFileCandidates(`assets/sounds/${animal.slug}`, LOCAL_SOUND_EXTENSIONS).map((url) => ({
      type: "audio",
      url,
    })),
    ...remoteSources,
  ];

  return playCandidateSources(sources, animal, sequence);
}

function playCandidateSources(sources, animal, sequence) {
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
        audio.removeAttribute("src");
        audio.load();
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
      audio.src = sources[index].url;
      index += 1;
      audio.load();

      timeoutId = window.setTimeout(() => {
        tryNext();
      }, 3000);
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
        tryNext();
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
    playback.audio.removeAttribute("src");
    playback.audio.load();
    playback.audio = null;
  }

  if (playback.activeButton) {
    playback.activeButton.classList.remove("is-playing");
  }

  playback.activeSlug = null;
  playback.activeButton = null;

  if (announce) {
    liveStatus.textContent = "Stopped.";
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
