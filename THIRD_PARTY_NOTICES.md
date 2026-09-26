# Third-party software and CAD assets

## OpenSCAD WebAssembly

`vendor/openscad/` is the unmodified `openscad-wasm` npm package, version 0.0.4 (package license declaration: GPL-2.0).

- Package: https://www.npmjs.com/package/openscad-wasm/v/0.0.4
- Distribution: https://registry.npmjs.org/openscad-wasm/-/openscad-wasm-0.0.4.tgz
- Distribution SHA-1: 5d0725b09148713f8762092cf08fa7ed550f4865
- Upstream WebAssembly source/build instructions: https://github.com/openscad/openscad-wasm
- OpenSCAD source: https://github.com/openscad/openscad

The package embeds its WebAssembly payload in `openscad.js`. It is loaded only in the rendering worker. Retain upstream notices and applicable GPL terms when redistributing. The npm archive does not identify a precise upstream build commit.

## Three.js

`vendor/three/` contains selected unchanged files from Three.js 0.180.0. Copyright the Three.js authors. MIT license; the complete license is retained at `vendor/three/LICENSE`.

- Source/release: https://github.com/mrdoob/three.js/tree/r180
- Package: https://registry.npmjs.org/three/-/three-0.180.0.tgz

## CAD for Precision Optics and hardware meshes

`cad/thorlabs_optomech.scad`, `cad/util.scad`, and the six files in `cad/thorlabs/` are copied without modification from the user-supplied `c4po-weebay_optics` directory. Its README identifies https://github.com/ichuang/cad4optics as the project source. No standalone license file was present in that supplied folder. These files are not relicensed by this interface; original authors' and hardware vendors' rights remain with their respective holders.

`cad/provenance.json` records SHA-256 digests of the supplied CAD files.

## Optical-Paths

https://github.com/WindSweeps/Optical-Paths was consulted as a user-requested interface reference. No source files, icons, or artwork from it were copied.
