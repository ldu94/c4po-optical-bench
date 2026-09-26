# C4PO Optical Bench

A visual editor for optical layouts and recessed base plates, built on the existing **CAD for Precision Optics (c4po)** OpenSCAD library. Drag mounts into a 2D plan, position their optical centers, and generate actual plate geometry in your browser.

## Use

1. Drag a component from the library onto the plate, or click its card.
2. Select it to enter X, Y, and counterclockwise rotation in millimeters/degrees. Use **R** to rotate 15° (Shift reverses), arrow keys to nudge, and Delete to remove.
3. Set plate dimensions, thickness, grid spacing, and snapping. **Connect beam** joins optical centers; Escape exits. Double-click a guide to remove it.
4. Open **3D model**. OpenSCAD runs in a worker and generates the real plate, including screw holes, alignment pins/slots, and recessed seats defined by c4po. Enable **Show actual mounts** to display the supplied hardware meshes at transforms extracted from c4po by OpenSCAD. Hardware meshes are displayed separately, so non-closed vendor meshes do not break the plate renderer. Rendering can take tens of seconds; the editor stays responsive and supports cancellation.
5. **Export plate STL** always downloads the plate alone, in millimeters. **Download OpenSCAD** produces an assembly source file for desktop OpenSCAD; place it in your original c4po folder next to `thorlabs_optomech.scad`, `util.scad`, and the `thorlabs` folder. Set `show_components=false` to render only the plate there.
6. Save/open a JSON layout to share or back up a project. Work is also saved locally in the current browser. Export SVG for a dimensionally scaled 2D diagram.

Undo/redo: Ctrl/Cmd Z and Ctrl/Cmd Shift Z. Scroll to zoom the plan; drag empty space to pan. **Fit view** resets the camera. The 3D viewer supports orbit, zoom, and right-drag panning.

## Supported mounts

| Part | c4po module |
| --- | --- |
| POLARIS-K05S1 | `mirror_mount_k05s1` |
| POLARIS-C05G | `mirror_mount_c05g` |
| KM100 | `mirror_mount_km100` |
| POLARIS-L05G | `lens_holder_l05g` |
| LMR1 | `lens_holder_lmr1` |
| IDA12 | `pinhole_ida12` (direct mounting, no surface adapter) |

This first catalog uses recessed seats with a beam height of **5–12.7 mm above the plate**. Larger beam heights and automatically generated raised posts are not implemented. The default plate is 260 × 180 × 25.4 mm, with a 12.7 mm beam height. Four optional corner holes are 6.604 mm clearance bores, placed 12.7 mm from the plate edges. Grid dots are positioning references, not additional drilled holes. Component holes retain the original library's imperial hardware sizes.

The coordinate origin is the lower-left of the plate. +X points right, +Y up; rotations are counterclockwise about the optical center. Optical centers lie at Z=0 in CAD, with the plate top at `-beamHeight`.

## Scope and mechanical checks

- Beam lines are editable connection guides, **not** a ray tracer or an optical alignment solver. Lenses do not focus simulated rays and mirror rotations do not automatically redirect paths.
- The 2D envelopes are approximate visual bounds, not vendor-verified collision volumes. The UI flags overlapping envelopes, plate-edge proximity, and insufficient material below a recessed mount. It does not certify hardware clearances, hole interference, thread engagement, tool access, or machining tolerances.
- The 3D renderer and exports use the original library geometry. No simplified replacement holes are substituted. Inspect output before machining; STL describes geometry, not tapping or a CNC toolpath.
- Arbitrary existing SCAD layouts are not parsed into editable projects. JSON files from this editor are the round-trip format.
- Vendor STL parts may contain non-manifold geometry. Assembly view is for inspection; the separate plate export is the fabrication artifact.
- Projects stay on the device. No login, backend, or uploaded layout data is needed.

## Run locally

Requires Python 3; no npm install/build step is needed.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765`. Serve over HTTP/HTTPS rather than opening `index.html` directly: module workers and CAD asset requests require a web origin.

## GitHub Pages

The app uses relative asset URLs and works under a project path such as `/c4po-optical-bench/`. In repository Settings → Pages, choose **GitHub Actions**. The included workflow tests the layout model and renders all six mount types, then deploys the static files on a push to `main`.

OpenSCAD WebAssembly and Three.js are pinned and vendored so a deployed page has no external runtime CDN dependency. WebAssembly runs in a regular module worker; no cross-origin isolation headers or server compute are needed.

## Development

- `model.js`: catalog, schema validation, coordinate conventions, bounds checks, and OpenSCAD generation.
- `app.js`: visual editing, history, persistence, exports, and worker lifecycle.
- `render-worker.js`: loads the CAD library, invokes OpenSCAD, and returns STL bytes.
- `viewer.js`: Three.js plate and hardware inspection.
- `scripts/build-mount-scenes.mjs`: regenerates `cad/mount-scenes.json` by evaluating the original c4po modules to CSG with OpenSCAD. This preserves their exact vendor-mesh transforms without expensive boolean unions or requiring watertight hardware meshes.
- `cad/`: unchanged copies of the two local c4po library files and six selected hardware meshes.
- `vendor/`: pinned OpenSCAD WASM 0.0.4 and Three.js 0.180.0.

```sh
node --test tests/model.test.mjs
node tests/render-smoke.mjs --all
node scripts/build-mount-scenes.mjs
```

To add a mount, verify the source module's optical origin, rotation, `show`/`drill` behavior, beam-height constraints, and dependencies. Add its catalog entry and required assets, then validate both plate and assembly rendering. Do not assume every c4po module shares the same parameter semantics.

## References and attribution

- The CAD backend derives from the user-supplied `c4po-weebay_optics` folder, whose README identifies [CAD for Precision Optics](https://github.com/ichuang/cad4optics).
- [Optical-Paths](https://github.com/WindSweeps/Optical-Paths) inspired the visual component-placement workflow. Its application code and artwork were not copied.
- [OpenSCAD WASM](https://github.com/openscad/openscad-wasm) makes client-side CAD possible.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for dependency versions and provenance. No blanket license is asserted over the supplied CAD/vendor assets.
