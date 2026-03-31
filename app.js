const STORAGE_KEY = "animal-sound-garden-state";
const IMAGE_EXTENSIONS = ["webp", "jpg", "jpeg", "png"];
const MOTION_EXTENSIONS = ["gif", "webp"];
const AUDIO_EXTENSIONS = ["mp3", "wav", "ogg"];

const CATEGORY_META = {
  all: {
    label: "All Categories",
    palette: { start: "#f6d89f", end: "#8bc9c0", accent: "#2c6652" },
  },
  farm: {
    label: "Farm Animals",
    palette: { start: "#f3d785", end: "#a7d39a", accent: "#507c2d" },
  },
  wild: {
    label: "Wild Animals",
    palette: { start: "#edbf78", end: "#c88453", accent: "#874620" },
  },
  jungle: {
    label: "Jungle Animals",
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
    label: "Other Sounds",
    palette: { start: "#7dbbd3", end: "#395974", accent: "#e8f7ff" },
  },
};

const ANIMALS = [
  {
    slug: "cow",
    name: "Cow",
    category: "farm",
    soundLabel: "Moo",
    spokenText: "Moo! Moo!",
    description: "A gentle farm friend with a big, slow moo.",
  },
  {
    slug: "goat",
    name: "Goat",
    category: "farm",
    soundLabel: "Bleat",
    spokenText: "Baa-aa!",
    description: "A playful goat that likes to bleat and hop.",
  },
  {
    slug: "sheep",
    name: "Sheep",
    category: "farm",
    soundLabel: "Baa",
    spokenText: "Baa! Baa!",
    description: "A fluffy sheep with a soft baa sound.",
  },
  {
    slug: "horse",
    name: "Horse",
    category: "farm",
    soundLabel: "Neigh",
    spokenText: "Neigh!",
    description: "A strong horse with a bright, ringing neigh.",
  },
  {
    slug: "pig",
    name: "Pig",
    category: "farm",
    soundLabel: "Oink",
    spokenText: "Oink! Oink!",
    description: "A happy muddy pig with a cheerful oink.",
  },
  {
    slug: "lion",
    name: "Lion",
    category: "wild",
    soundLabel: "Roar",
    spokenText: "Roar!",
    description: "A big wild lion with a deep roaring voice.",
  },
  {
    slug: "elephant",
    name: "Elephant",
    category: "wild",
    soundLabel: "Trumpet",
    spokenText: "Pawoo!",
    description: "A giant elephant with a trumpet call from its trunk.",
  },
  {
    slug: "bear",
    name: "Bear",
    category: "wild",
    soundLabel: "Growl",
    spokenText: "Grrr...",
    description: "A heavy bear with a low grumbly growl.",
  },
  {
    slug: "wolf",
    name: "Wolf",
    category: "wild",
    soundLabel: "Howl",
    spokenText: "Awoooo!",
    description: "A wolf that sends a long howl into the sky.",
  },
  {
    slug: "zebra",
    name: "Zebra",
    category: "wild",
    soundLabel: "Snort",
    spokenText: "Snort!",
    description: "A striped zebra with a short snort and whinny.",
  },
  {
    slug: "tiger",
    name: "Tiger",
    category: "jungle",
    soundLabel: "Roar",
    spokenText: "Roooar!",
    description: "A bold tiger with a fierce jungle roar.",
  },
  {
    slug: "monkey",
    name: "Monkey",
    category: "jungle",
    soundLabel: "Chatter",
    spokenText: "Ooh-ooh! Aah-aah!",
    description: "A silly monkey with fast, excited chatter.",
  },
  {
    slug: "gorilla",
    name: "Gorilla",
    category: "jungle",
    soundLabel: "Grunt",
    spokenText: "Hoom! Hoom!",
    description: "A strong gorilla with a deep chesty grunt.",
  },
  {
    slug: "snake",
    name: "Snake",
    category: "jungle",
    soundLabel: "Hiss",
    spokenText: "Sssss...",
    description: "A quiet snake with a long, whispery hiss.",
  },
  {
    slug: "leopard",
    name: "Leopard",
    category: "jungle",
    soundLabel: "Snarl",
    spokenText: "Rrrrah!",
    description: "A fast leopard with a sharp snarl.",
  },
  {
    slug: "chicken",
    name: "Chicken",
    category: "birds",
    soundLabel: "Cluck",
    spokenText: "Cluck cluck!",
    description: "A busy chicken with a quick clucking sound.",
  },
  {
    slug: "duck",
    name: "Duck",
    category: "birds",
    soundLabel: "Quack",
    spokenText: "Quack! Quack!",
    description: "A waddling duck that quacks on the pond.",
  },
  {
    slug: "owl",
    name: "Owl",
    category: "birds",
    soundLabel: "Hoot",
    spokenText: "Hoo-hoo!",
    description: "A night owl with a round, echoing hoot.",
  },
  {
    slug: "parrot",
    name: "Parrot",
    category: "birds",
    soundLabel: "Squawk",
    spokenText: "Squawk!",
    description: "A colorful parrot with a loud squawk.",
  },
  {
    slug: "rooster",
    name: "Rooster",
    category: "birds",
    soundLabel: "Crow",
    spokenText: "Cock-a-doodle-doo!",
    description: "A sunrise rooster that proudly crows.",
  },
  {
    slug: "dog",
    name: "Dog",
    category: "pets",
    soundLabel: "Woof",
    spokenText: "Woof! Woof!",
    description: "A loyal dog with a bright barking woof.",
  },
  {
    slug: "cat",
    name: "Cat",
    category: "pets",
    soundLabel: "Meow",
    spokenText: "Meow!",
    description: "A curious cat with a sweet meow.",
  },
  {
    slug: "rabbit",
    name: "Rabbit",
    category: "pets",
    soundLabel: "Sniff",
    spokenText: "Sniff sniff!",
    description: "A soft rabbit making tiny nose sounds.",
  },
  {
    slug: "hamster",
    name: "Hamster",
    category: "pets",
    soundLabel: "Squeak",
    spokenText: "Squeak! Squeak!",
    description: "A tiny hamster with a high little squeak.",
  },
  {
    slug: "canary",
    name: "Canary",
    category: "pets",
    soundLabel: "Chirp",
    spokenText: "Chirp-chirp!",
    description: "A bright canary singing a chirpy tune.",
  },
  {
    slug: "bee",
    name: "Bee",
    category: "insects",
    soundLabel: "Buzz",
    spokenText: "Bzzzz!",
    description: "A busy bee with a warm buzzing sound.",
  },
  {
    slug: "cricket",
    name: "Cricket",
    category: "insects",
    soundLabel: "Chirp",
    spokenText: "Chirp... chirp...",
    description: "A night cricket with a steady chirp.",
  },
  {
    slug: "grasshopper",
    name: "Grasshopper",
    category: "insects",
    soundLabel: "Click",
    spokenText: "Click-click!",
    description: "A jumping grasshopper with a tiny click.",
  },
  {
    slug: "mosquito",
    name: "Mosquito",
    category: "insects",
    soundLabel: "Whine",
    spokenText: "Zzzzz...",
    description: "A small mosquito with a thin buzzing whine.",
  },
  {
    slug: "cicada",
    name: "Cicada",
    category: "insects",
    soundLabel: "Hum",
    spokenText: "Brrrrrrr!",
    description: "A summer cicada with a loud humming call.",
  },
  {
    slug: "rain",
    name: "Rain",
    category: "other",
    soundLabel: "Pitter-patter",
    spokenText: "Pitter-patter. Drip drop.",
    description: "Soft rain sounds for calm listening time.",
  },
  {
    slug: "thunder",
    name: "Thunder",
    category: "other",
    soundLabel: "Boom",
    spokenText: "Boom! Rumble...",
    description: "Big cloudy thunder with a rolling boom.",
  },
  {
    slug: "wind",
    name: "Wind",
    category: "other",
    soundLabel: "Whoosh",
    spokenText: "Whoooosh!",
    description: "A breezy wind sound that swirls and whooshes.",
  },
  {
    slug: "train",
    name: "Train",
    category: "other",
    soundLabel: "Toot-toot",
    spokenText: "Toot-toot!",
    description: "A train horn that calls out on the tracks.",
  },
  {
    slug: "bell",
    name: "Bell",
    category: "other",
    soundLabel: "Ding-dong",
    spokenText: "Ding-dong!",
    description: "A clear bell sound that rings brightly.",
  },
].map((animal) => ({
  ...animal,
  categoryLabel: CATEGORY_META[animal.category].label,
  palette: CATEGORY_META[animal.category].palette,
}));

const state = {
  category: "all",
  search: "",
  assetMode: "still",
};

const playback = {
  activeSlug: null,
  activeButton: null,
  audio: null,
  utterance: null,
};

let playSequence = 0;

const cardTemplate = document.querySelector("#animalCardTemplate");
const animalGrid = document.querySelector("#animalGrid");
const categoryChips = document.querySelector("#categoryChips");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const statusText = document.querySelector("#statusText");
const liveStatus = document.querySelector("#liveStatus");
const stopSoundButton = document.querySelector("#stopSoundButton");
const assetModeButtons = [...document.querySelectorAll("[data-asset-mode]")];

restoreState();
attachEvents();
renderCategoryChips();
renderCards();
syncAssetModeButtons();

function attachEvents() {
  searchInput.value = state.search;
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trimStart();
    stopCurrentPlayback({ announce: false });
    renderCards();
    persistState();
  });

  assetModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.assetMode;
      if (!nextMode || nextMode === state.assetMode) {
        return;
      }

      state.assetMode = nextMode;
      stopCurrentPlayback({ announce: false });
      syncAssetModeButtons();
      renderCards();
      persistState();
    });
  });

  stopSoundButton.addEventListener("click", () => {
    stopCurrentPlayback({ announce: true });
    updateStatus("Sound stopped.");
  });
}

function renderCategoryChips() {
  categoryChips.innerHTML = "";

  Object.entries(CATEGORY_META).forEach(([categoryId, meta]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = categoryId === state.category ? "is-active" : "";
    button.setAttribute("aria-pressed", String(categoryId === state.category));
    button.innerHTML = `
      <span>${meta.label}</span>
      <span class="chip-count">${countAnimals(categoryId)}</span>
    `;

    button.addEventListener("click", () => {
      if (state.category === categoryId) {
        return;
      }

      state.category = categoryId;
      stopCurrentPlayback({ announce: false });
      renderCategoryChips();
      renderCards();
      persistState();
    });

    categoryChips.append(button);
  });
}

function renderCards() {
  const filteredAnimals = getFilteredAnimals();
  animalGrid.innerHTML = "";

  if (filteredAnimals.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div>
        <h2>No match yet</h2>
        <p>Try a different search word or switch back to All Categories.</p>
      </div>
    `;
    animalGrid.append(emptyState);
    resultCount.textContent = "0 cards";
    return;
  }

  filteredAnimals.forEach((animal) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".animal-card");
    const button = fragment.querySelector(".animal-card__button");
    const image = fragment.querySelector(".animal-card__image");
    const badge = fragment.querySelector(".animal-card__badge");
    const category = fragment.querySelector(".animal-card__category");
    const name = fragment.querySelector(".animal-card__name");
    const description = fragment.querySelector(".animal-card__description");
    const sound = fragment.querySelector(".animal-card__sound");

    card.style.setProperty("--card-start", animal.palette.start);
    card.style.setProperty("--card-end", animal.palette.end);
    card.style.setProperty("--card-accent", animal.palette.accent);
    card.classList.toggle("animal-card--motion", state.assetMode === "motion");

    category.textContent = animal.categoryLabel;
    name.textContent = animal.name;
    description.textContent = animal.description;
    sound.textContent = animal.soundLabel;
    image.alt =
      state.assetMode === "motion"
        ? `${animal.name} motion preview`
        : `${animal.name} artwork preview`;

    loadVisual(image, badge, animal, state.assetMode);

    button.addEventListener("click", () => {
      handlePlayClick(animal, button);
    });

    animalGrid.append(fragment);
  });

  const label = filteredAnimals.length === 1 ? "card" : "cards";
  resultCount.textContent = `${filteredAnimals.length} ${label}`;
}

function loadVisual(imageElement, badgeElement, animal, mode) {
  const candidates = buildVisualCandidates(animal, mode);
  let index = 0;
  let sourceType = "fallback";

  const useFallback = () => {
    sourceType = "fallback";
    imageElement.onerror = null;
    imageElement.onload = () => {
      badgeElement.textContent = mode === "motion" ? "Animated still" : "Studio artwork";
    };
    imageElement.src = buildFallbackArtwork(animal, mode);
  };

  imageElement.onload = () => {
    const badgeText = {
      gif: "Moving GIF",
      motionPhoto: "Motion photo",
      photo: "Custom photo",
      fallback: mode === "motion" ? "Animated still" : "Studio artwork",
    };
    badgeElement.textContent = badgeText[sourceType] || badgeText.fallback;
  };

  imageElement.onerror = () => {
    if (index >= candidates.length) {
      useFallback();
      return;
    }

    const nextCandidate = candidates[index++];
    sourceType = nextCandidate.type;
    imageElement.src = nextCandidate.src;
  };

  if (candidates.length === 0) {
    useFallback();
    return;
  }

  const firstCandidate = candidates[index++];
  sourceType = firstCandidate.type;
  imageElement.src = firstCandidate.src;
}

function buildVisualCandidates(animal, mode) {
  if (mode === "motion") {
    return [
      ...MOTION_EXTENSIONS.map((extension) => ({
        src: `assets/gifs/${animal.slug}.${extension}`,
        type: "gif",
      })),
      ...IMAGE_EXTENSIONS.map((extension) => ({
        src: `assets/images/${animal.slug}.${extension}`,
        type: "motionPhoto",
      })),
    ];
  }

  return IMAGE_EXTENSIONS.map((extension) => ({
    src: `assets/images/${animal.slug}.${extension}`,
    type: "photo",
  }));
}

function buildFallbackArtwork(animal, mode) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${escapeXml(
      animal.name
    )}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${animal.palette.start}" />
          <stop offset="100%" stop-color="${animal.palette.end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" />
      <circle cx="690" cy="105" r="120" fill="rgba(255,255,255,0.18)" />
      <circle cx="120" cy="520" r="140" fill="rgba(255,255,255,0.16)" />
      <path d="M0 425C133 365 247 345 340 365C451 389 532 482 800 410V600H0Z" fill="rgba(255,255,255,0.14)" />
      <rect x="52" y="58" rx="26" ry="26" width="250" height="54" fill="rgba(255,250,244,0.26)" />
      <text x="78" y="94" font-family="Trebuchet MS, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="rgba(255,250,244,0.88)">${escapeXml(
        animal.categoryLabel.toUpperCase()
      )}</text>
      <text x="62" y="310" font-family="Trebuchet MS, Arial, sans-serif" font-size="110" font-weight="700" fill="rgba(255,251,245,0.96)">${escapeXml(
        animal.name
      )}</text>
      <text x="64" y="382" font-family="Avenir Next, Trebuchet MS, Arial, sans-serif" font-size="46" font-weight="700" fill="${animal.palette.accent}">${escapeXml(
        animal.soundLabel
      )}</text>
      <text x="64" y="438" font-family="Avenir Next, Trebuchet MS, Arial, sans-serif" font-size="30" fill="rgba(255,251,245,0.92)">${
        mode === "motion" ? "Motion mode ready for GIFs" : "Ready for real photo upgrade"
      }</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function handlePlayClick(animal, button) {
  const isSameCard = playback.activeSlug === animal.slug;
  playSequence += 1;
  const currentSequence = playSequence;

  stopCurrentPlayback({ announce: false });

  if (isSameCard) {
    updateStatus(`${animal.name} stopped.`);
    return;
  }

  playback.activeSlug = animal.slug;
  playback.activeButton = button;
  button.classList.add("is-playing");
  stopSoundButton.disabled = false;

  updateStatus(`${animal.name} says ${animal.soundLabel}.`);

  playAudioIfAvailable(animal, currentSequence).then((playedAudio) => {
    if (currentSequence !== playSequence) {
      return;
    }

    if (!playedAudio) {
      playSpokenFallback(animal, currentSequence);
    }
  });
}

function playAudioIfAvailable(animal, sequence) {
  const sources = AUDIO_EXTENSIONS.map((extension) => `assets/sounds/${animal.slug}.${extension}`);

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
            updateStatus(`${animal.name} finished playing.`);
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

function playSpokenFallback(animal, sequence) {
  if (!("speechSynthesis" in window)) {
    stopCurrentPlayback({ announce: false });
    updateStatus(
      `No browser voice found. Add assets/sounds/${animal.slug}.mp3 if you want a real clip for ${animal.name}.`
    );
    return;
  }

  const utterance = new SpeechSynthesisUtterance(animal.spokenText);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  utterance.pitch = animal.category === "birds" || animal.category === "insects" ? 1.18 : 1.06;
  utterance.volume = 1;
  utterance.onend = () => {
    if (sequence === playSequence) {
      stopCurrentPlayback({ announce: false });
      updateStatus(`${animal.name} finished playing.`);
    }
  };
  utterance.onerror = () => {
    if (sequence === playSequence) {
      stopCurrentPlayback({ announce: false });
      updateStatus(`Could not play ${animal.name} right now.`);
    }
  };

  playback.utterance = utterance;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function stopCurrentPlayback({ announce }) {
  if (playback.audio) {
    playback.audio.pause();
    playback.audio.currentTime = 0;
    playback.audio.src = "";
    playback.audio = null;
  }

  if (playback.utterance && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    playback.utterance = null;
  }

  if (playback.activeButton) {
    playback.activeButton.classList.remove("is-playing");
  }

  playback.activeSlug = null;
  playback.activeButton = null;
  stopSoundButton.disabled = true;

  if (announce) {
    liveStatus.textContent = "Sound stopped.";
  }
}

function getFilteredAnimals() {
  const query = state.search.trim().toLowerCase();

  return ANIMALS.filter((animal) => {
    const categoryMatches = state.category === "all" || animal.category === state.category;
    const queryMatches =
      query.length === 0 ||
      animal.name.toLowerCase().includes(query) ||
      animal.soundLabel.toLowerCase().includes(query) ||
      animal.categoryLabel.toLowerCase().includes(query);

    return categoryMatches && queryMatches;
  });
}

function countAnimals(categoryId) {
  if (categoryId === "all") {
    return ANIMALS.length;
  }

  return ANIMALS.filter((animal) => animal.category === categoryId).length;
}

function syncAssetModeButtons() {
  assetModeButtons.forEach((button) => {
    const isActive = button.dataset.assetMode === state.assetMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateStatus(message) {
  statusText.textContent = message;
  liveStatus.textContent = message;
}

function persistState() {
  const nextState = {
    category: state.category,
    assetMode: state.assetMode,
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
    if (stored.category && CATEGORY_META[stored.category]) {
      state.category = stored.category;
    }
    if (stored.assetMode === "still" || stored.assetMode === "motion") {
      state.assetMode = stored.assetMode;
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
