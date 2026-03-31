const STORAGE_KEY = "animal-sounds-baby-state";
const LOCAL_CATEGORY_EXTENSIONS = ["gif", "webp", "jpg", "jpeg", "png"];
const LOCAL_ANIMAL_EXTENSIONS = ["gif", "webp", "jpg", "jpeg", "png"];
const LOCAL_SOUND_EXTENSIONS = ["mp3", "wav", "ogg"];

function commonsFilePath(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
}

const CATEGORY_META = {
  farm: {
    label: "Farm",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Holstein_cow_%281%29.jpg",
  },
  wild: {
    label: "Wild",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Lion_%2836326193942%29.jpg/960px-Lion_%2836326193942%29.jpg",
  },
  jungle: {
    label: "Jungle",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg",
  },
  birds: {
    label: "Birds",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Duck_%2827479047527%29.jpg/1280px-Duck_%2827479047527%29.jpg",
  },
  pets: {
    label: "Pets",
    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Photo_of_a_dog.jpg",
  },
  insects: {
    label: "Insects",
    coverUrl: commonsFilePath("Flower_and_Bee.jpg"),
  },
};

const CATEGORY_ORDER = ["farm", "wild", "jungle", "birds", "pets", "insects"];

const ANIMALS = [
  {
    slug: "cow",
    name: "Cow",
    category: "farm",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Holstein_cow_%281%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/48/Mudchute_cow_1.ogg/Mudchute_cow_1.ogg.mp3",
      },
    ],
  },
  {
    slug: "horse",
    name: "Horse",
    category: "farm",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Horse_%28Unsplash%29.jpg/1280px-Horse_%28Unsplash%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/db/Wiehern.ogg/Wiehern.ogg.mp3",
      },
    ],
  },
  {
    slug: "lion",
    name: "Lion",
    category: "wild",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Lion_%2836326193942%29.jpg/960px-Lion_%2836326193942%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7d/Lion_raring-sound1TamilNadu178.ogg/Lion_raring-sound1TamilNadu178.ogg.mp3",
      },
    ],
  },
  {
    slug: "elephant",
    name: "Elephant",
    category: "wild",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elephant_%282404607215%29.jpg/960px-Elephant_%282404607215%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/40/Elephant_voice_-_trumpeting.ogg/Elephant_voice_-_trumpeting.ogg.mp3",
      },
    ],
  },
  {
    slug: "tiger",
    name: "Tiger",
    category: "jungle",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Panthera_tigris_tigris.jpg",
    mediaSources: [
      {
        type: "video",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d3/Panthera_tigris3.ogv/Panthera_tigris3.ogv.360p.webm",
      },
      {
        type: "video",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d3/Panthera_tigris3.ogv/Panthera_tigris3.ogv.144p.mjpeg.mov",
      },
    ],
  },
  {
    slug: "monkey",
    name: "Monkey",
    category: "jungle",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Macaque_Monkey_%2816787053847%29.jpg/1280px-Macaque_Monkey_%2816787053847%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/28/Sound-of-stump-tailed-macaque-%28macaca-arctoides%29.ogg/Sound-of-stump-tailed-macaque-%28macaca-arctoides%29.ogg.mp3",
      },
    ],
  },
  {
    slug: "duck",
    name: "Duck",
    category: "birds",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Duck_%2827479047527%29.jpg/1280px-Duck_%2827479047527%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Mudchute_duck_2.ogg/Mudchute_duck_2.ogg.mp3",
      },
    ],
  },
  {
    slug: "owl",
    name: "Owl",
    category: "birds",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Owl_%2829211223804%29.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Tawny_Owl_%28Strix_aluco%29_%28W1CDR0001519_BD8%29.ogg/Tawny_Owl_%28Strix_aluco%29_%28W1CDR0001519_BD8%29.ogg.mp3",
      },
    ],
  },
  {
    slug: "dog",
    name: "Dog",
    category: "pets",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Photo_of_a_dog.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/58/Barking_of_a_dog_2.ogg/Barking_of_a_dog_2.ogg.mp3",
      },
    ],
  },
  {
    slug: "cat",
    name: "Cat",
    category: "pets",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/A_cat.jpg",
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/62/Meow.ogg/Meow.ogg.mp3",
      },
    ],
  },
  {
    slug: "bee",
    name: "Bee",
    category: "insects",
    imageUrl: commonsFilePath("Flower_and_Bee.jpg"),
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0f/Bee_buzzing_sound_%28animal_noises%29.opus/Bee_buzzing_sound_%28animal_noises%29.opus.mp3",
      },
    ],
  },
  {
    slug: "cricket",
    name: "Cricket",
    category: "insects",
    imageUrl: commonsFilePath("Cricket.jpg"),
    mediaSources: [
      {
        type: "audio",
        url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/80/Field_cricket_Gryllus_pennsylvanicus.ogg/Field_cricket_Gryllus_pennsylvanicus.ogg.mp3",
      },
    ],
  },
];

const state = {
  activeCategory: null,
};

const playback = {
  activeSlug: null,
  activeButton: null,
  element: null,
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

function loadCategoryVisual(imageElement, categoryId, meta) {
  loadImageWithFallback(
    imageElement,
    [
      ...buildFileCandidates(`assets/categories/${categoryId}`, LOCAL_CATEGORY_EXTENSIONS),
      meta.coverUrl,
    ],
    buildCategoryFallbackArtwork(meta)
  );
}

function loadAnimalVisual(imageElement, animal) {
  loadImageWithFallback(
    imageElement,
    [
      ...buildFileCandidates(`assets/gifs/${animal.slug}`, LOCAL_ANIMAL_EXTENSIONS),
      animal.imageUrl,
    ],
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

  playMediaIfAvailable(animal, currentSequence).then((played) => {
    if (currentSequence !== playSequence) {
      return;
    }

    if (!played) {
      stopCurrentPlayback({ announce: false });
      announce(`${animal.name} media missing.`);
    }
  });
}

function playMediaIfAvailable(animal, sequence) {
  const sources = [
    ...buildFileCandidates(`assets/sounds/${animal.slug}`, LOCAL_SOUND_EXTENSIONS).map((url) => ({
      type: "audio",
      url,
    })),
    ...animal.mediaSources,
  ];

  return new Promise((resolve) => {
    let index = 0;

    const tryNext = () => {
      if (sequence !== playSequence) {
        resolve(false);
        return;
      }

      if (index >= sources.length) {
        resolve(false);
        return;
      }

      const source = sources[index];
      index += 1;

      const element = source.type === "video" ? document.createElement("video") : new Audio();
      let timeoutId = null;

      const cleanup = () => {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
        element.removeEventListener("loadeddata", handleLoaded);
        element.removeEventListener("error", handleError);
      };

      const handleLoaded = async () => {
        cleanup();

        if (sequence !== playSequence) {
          stopElement(element);
          resolve(false);
          return;
        }

        try {
          element.currentTime = 0;
          playback.element = element;
          element.onended = () => {
            if (sequence === playSequence) {
              stopCurrentPlayback({ announce: false });
              announce(`${animal.name} done.`);
            }
          };
          await element.play();
          resolve(true);
        } catch {
          stopElement(element);
          tryNext();
        }
      };

      const handleError = () => {
        cleanup();
        stopElement(element);
        tryNext();
      };

      element.preload = "auto";
      element.src = source.url;
      if ("playsInline" in element) {
        element.playsInline = true;
      }
      element.addEventListener("loadeddata", handleLoaded, { once: true });
      element.addEventListener("error", handleError, { once: true });
      element.load();

      timeoutId = window.setTimeout(() => {
        cleanup();
        stopElement(element);
        tryNext();
      }, 2500);
    };

    tryNext();
  });
}

function stopElement(element) {
  element.pause();
  element.removeAttribute("src");
  element.load();
}

function stopCurrentPlayback({ announce }) {
  if (playback.element) {
    stopElement(playback.element);
    playback.element = null;
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
