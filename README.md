# Cross-Game Renderer (XGR)

## What is it?

A standard for rendering NFTs, allowing them to be displayed (and animated!) in any game.

## Why do we need it?

Being built on a blockchain, a superpower of NFTs is that they can be used across different games. One challenge, however, is that each game has different technical specifications such as use of game engines, data formats, etc. This makes it challenging to integrate NFTs across different game genres.

The Cross-Game Renderer (XGR) addresses this by engaging us to define and share how a specific NFT collection is rendered.

[XGR-arcadians](https://github.com/alto-io/xgr-arcadians) is given as an example implementation. It uses the [Open Raster Format](https://gitlab.com/inklabapp/jsora) (.ora) for image layers and [GL Transmission File](https://learn.microsoft.com/en-us/windows/mixed-reality/distribute/creating-3d-models-for-use-in-the-windows-mixed-reality-home) (.gltf) for animation. 

We encourage builders to fork [XGR-arcadians](https://github.com/alto-io/xgr-arcadians) and define how other collections are rendered. As more and more projects build on XGR, the vision of permissionless cross-game interoperability will be realized.

# Adding Collections

Adding more and more collections that are XGR-enabled on the [XGR Homepage](https://xgr.opgames.org/) are highly encouraged! To do so, simply create a pull request updating the registry on [public/registry.json](public/registry.json)

# Further Work

* XGR-Arcadians uses GLTF, which is more broadly supported on 3D Game engines such as BabylonJS. An animation implementation for 2D Engines such as Phaser would be very useful, perhaps using [.json files for 2d skeletal animation](https://github.com/EsotericSoftware/spine-runtimes/).
* While the [XGR Homepage](https://xgr.opgames.org/) and the [collection registry](public/registry.json) makes it easy to update the page with new collections, it is a point of centralization and is not permissionless. Further work on moving this on an on-chain registry similar to [EIP-6551](https://eips.ethereum.org/EIPS/eip-6551) should be explored. 