/** 3-day KV TTL in seconds — used for Bazuka cards, Anakin resumes, Yaiba notes, and Ragnar decks */
export const TTL_3_DAYS = 259200;

/** 1MB payload size limit in bytes */
export const MAX_PAYLOAD_SIZE = 1_048_576;

/** Standard AI token budget for structured JSON responses (Anakin, Musashi, Odin) */
export const AI_MAX_TOKENS_STANDARD = 350;

/** Extended AI token budget for Ragnar slide deck generation */
export const AI_MAX_TOKENS_RAGNAR = 4000;

/** Freya search result cache TTL in seconds (10 minutes) */
export const FREYA_CACHE_TTL = 600;
