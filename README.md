# Hielke Parkour Maps

This repository contains Hielke parkour maps — the community parkour levels made and curated as seen on https://hielkemaps.com.

These maps are short, focused movement challenges designed for practicing parkour-style movement, routing, and speedrunning techniques.

## About HielkeMaps

HielkeMaps (https://hielkemaps.com) is a collection and hub for parkour maps and leaderboards. The maps here follow the same design goals: clear starts and ends, repeatable routes, and checkpoint-based timing for comparing runs.

## What’s included

- One or more Hielke parkour map files (common formats: `.bsp`, `.map`, or engine-specific packages).
- Optional assets for the maps (textures, models, sounds) in an `assets/` or `maps/<mapname>/` folder if present.
- Demo or run files where available (e.g., recorded demos, leaderboards, or timing scripts).

If you don’t see the map files you expect, search the repository for `hielke`, `parkour`, or the map names listed on hielkemaps.com.

## How to install and run the maps

General steps (engine-agnostic):
1. Locate the map file(s) in this repository (common folders: `maps/`, `content/`, or the repo root).
2. Copy the map file(s) and any required asset folders into your game's `maps` or `levels` folder.
3. Start the game and load the map (many engines let you type `map <mapname>` or select it from the level menu).
4. Use any in-game or external timing/recording tools to capture your run and compare with leaderboards on hielkemaps.com.

Engine-specific note (Source engine / GoldSrc):
- Place `.bsp` files into the game's `maps/` directory (`<steamapps>/common/<game>/maps/`).
- Launch the game, open the console, and run: `map <mapname>`

If you tell me which game/engine you use, I can add precise commands and common server settings (e.g., enabling sv_cheats for testing is not recommended for leaderboard-legal runs).

## How to play

- Start at the map's spawn point and follow or discover the intended route.
- Use checkpoints if the map provides them to practice segments.
- Record demos or use a timing utility to capture your time for leaderboard submission.

## Contributing maps or updates

Contributions are welcome. Suggested workflow:
1. Fork the repo and create a branch for your map or changes.
2. Add the map file(s) under `maps/<mapname>/` and include metadata: author, version, engine, and a short description.
3. Include a thumbnail image (`thumbnail.png`) and a `README.md` inside the map folder describing routes and recommended settings.
4. Open a pull request with details and any demo/demo scripts for verification.

Please include the original author attribution and a link to any source (for example, the map’s page on hielkemaps.com).

## Attribution and links

Maps and the HielkeMaps website are community-created. If you are the original author of a map included here, add a note in the map's folder with your preferred credit and license terms.

- HielkeMaps: https://hielkemaps.com

## License

If the maps or assets in this repository have a specific license, include that in each map folder or in this README. If unspecified, assume the repository-wide license applies — add a LICENSE file to make reuse terms explicit.

---

If you want, I can:
- Update this README with direct links to specific maps on hielkemaps.com.
- Add thumbnails and example demo commands for a particular engine (Source, Quake, Unity, etc.).
- Create a `maps/` folder structure and add metadata files for each map found in the repo.

Tell me which maps (or which game/engine) to target and I’ll update the README and repository accordingly.