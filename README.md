# C4PO Optical Bench

A visual editor for optical layouts and recessed base plates, built on the existing **CAD for Precision Optics (c4po)** OpenSCAD library. Drag mounts into a 2D plan, position their optical centers, and generate actual plate geometry in your browser.

## Use

1. Drag a component from the library onto the plate, or click its card.
2. Select it to enter X, Y, and counterclockwise rotation in millimeters/degrees. Use **R** to rotate 15° (Shift reverses), arrow keys to nudge, and Delete to remove.
3. Set plate dimensions, thickness, grid spacing, and snapping. **Connect beam** joins optical centers; Escape exits. Double-click a guide to remove it.
4. Open **3D model**. OpenSCAD runs in a worker and generates the real plate, including screw holes, alignment pins/slots, and recessed seats defined by c4po. Enable **Show actual mounts** to display the supplied hardware meshes at transforms extracted from c4po by OpenSCAD. Hardware meshes are displayed separately, so non-closed vendor meshes do not break the plate renderer. Rendering can take tens of seconds; the editor stays responsive and supports cancellation.
5. **Export plate STL** always downloads the plate alone, in millimeters. **Download OpenSCAD** produces an assembly source file for desktop OpenSCAD; place it in your original c4po folder next to `thorlabs_optomech.scad`, `aom_optomech.scad`, `util.scad`, and the `thorlabs` folder. Set `show_components=false` to render only the plate there.
6. **Save design…** opens your named design library. Save multiple designs in the browser, or download JSON files and use **Open design** to restore them. In browsers offering the File System Access API (such as desktop Chrome/Edge), use **Save design as…** or **Choose folder…** to work directly in a local directory. **Update opened file** saves changes to the associated file. The app remembers a chosen folder when browser permissions allow it; otherwise choose it again next session. Other browsers use JSON download/open. Components, positions, rotations, connections, plate settings, and viewer options all round-trip. Older version-1 files remain supported. The latest working draft is also saved automatically in this browser.
7. Toggle **Show optical beams** in 3D to show/hide connection guides in both views. Use **Load double-pass AOM example** for an editable starter based on `doublepass_aom.scad`. Undo restores your previous layout. This starter imports component placement and beam connections, not the source's optional cuts, labels, or bespoke table-mounting holes. Export SVG for a dimensionally scaled 2D diagram.

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

| Isomet 1205C / KM100PM | `isomet_on_mount_km100pm` |
| Brimrose TEF-80-40 / KM100PM | `brimrose_on_mount_km100pm` |
| Gooch & Housego 3080 / KM100PM | `gooch_housego_3080_on_mount_km100pm` (optical origin corrected by −33 mm X) |
| RSP05 waveplate rotation | `rotation_stage_rsp05` (low-profile adapter) |
| RSP1 waveplate rotation | `rotation_stage_rsp1` |
| 10 mm PBS / skate adapter | `pbs_on_skate_mount` |
| HCA3 fiber-port holder | `fiberport_sidemount` |
| DET10A2 detector / cage adapter | `pd_det10a2` |
| IO-3D-850 isolator | `isolator_io_3D_850` |
| CP02 cage plate / adapter | `cage_mount` |
| IDA12 sliding iris | `pinhole_ida12_slide_mount` |
| POLARIS-K05S2 | `mirror_mount_k05s2` |

The PBS skate adapter and sliding iris bracket require **12.7 mm** beam height. Side-mounted fiber ports belong at a plate edge and require horizontal side holes; the supplied model includes the HCA3 holder but not the coupler. AOM assemblies and custom adapters appear in the viewer; **plate STL** still exports only the plate. Use the assembly OpenSCAD source for separate adapter fabrication.

The catalog uses recessed seats with a beam height of **5–12.7 mm above the plate**. Larger beam heights and automatically generated raised posts are not implemented. The default plate is 260 × 180 × 25.4 mm, with a 12.7 mm beam height. Four optional corner holes are 6.604 mm clearance bores, placed 12.7 mm from the plate edges. Grid dots are positioning references, not additional drilled holes. Component holes retain the original library's imperial hardware sizes.

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

The app uses relative asset URLs and works under a project path such as `/c4po-optical-bench/`. In repository Settings → Pages, choose **GitHub Actions**. The included workflow tests the layout model and renders plates covering all 18 component types, then deploys the static files on a push to `main`.

OpenSCAD WebAssembly and Three.js are pinned and vendored so a deployed page has no external runtime CDN dependency. WebAssembly runs in a regular module worker; no cross-origin isolation headers or server compute are needed.

## Development

- `model.js`: catalog, schema validation, coordinate conventions, bounds checks, and OpenSCAD generation.
- `app.js`: visual editing, history, persistence, exports, and worker lifecycle.
- `render-worker.js`: loads the CAD library, invokes OpenSCAD, and returns STL bytes.
- `viewer.js`: Three.js plate and hardware inspection.
- `scripts/build-mount-scenes.mjs`: regenerates `cad/mount-scenes.json` by evaluating the original c4po modules to CSG with OpenSCAD. This preserves their exact vendor-mesh transforms without expensive unions of vendor meshes or requiring watertight hardware meshes. Procedural geometry (AOM bodies, optics, adapters) is rendered separately to `cad/generated/`, preserving its native boolean geometry.
- `cad/`: unchanged copies of three local c4po library files and selected hardware meshes, plus a dependency bridge, generated procedural meshes, and their scene manifest.
- `vendor/`: pinned OpenSCAD WASM 0.0.4 and Three.js 0.180.0.

```sh
node --test tests/*.test.mjs
node tests/render-smoke.mjs --all
node tests/render-smoke.mjs --expanded
node scripts/build-mount-scenes.mjs
```

To add a mount, verify the source module's optical origin, rotation, `show`/`drill` behavior, beam-height constraints, and dependencies. Add its catalog entry and required assets, then validate both plate and assembly rendering. Do not assume every c4po module shares the same parameter semantics.

## References and attribution

- The CAD backend derives from the user-supplied `c4po-weebay_optics` folder, whose README identifies [CAD for Precision Optics](https://github.com/ichuang/cad4optics).
- [Optical-Paths](https://github.com/WindSweeps/Optical-Paths) inspired the visual component-placement workflow. Its application code and artwork were not copied.
- [OpenSCAD WASM](https://github.com/openscad/openscad-wasm) makes client-side CAD possible.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for dependency versions and provenance. No blanket license is asserted over the supplied CAD/vendor assets.
