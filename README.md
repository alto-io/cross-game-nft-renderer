# Cross-Game Renderer (XGR)

## What is it?

A standard for rendering NFTs, allowing them to be displayed (and animated!) in any game.

## Why do we need it?

A superpower of NFTs is that they can be used across different games. One challenge is that each game has different technical specifications such as use of game engines, data formats, etc. This makes it challenging to integrate NFTs across different game genres.

The **Cross-Game Renderer (XGR)** addresses this by engaging us to define and share how a specific NFT collection is rendered.

[XGR-arcadians](https://github.com/alto-io/xgr-arcadians) is given as an example implementation. It uses the [Open Raster Format](https://gitlab.com/inklabapp/jsora) (.ora) for image layers and [GL Transmission File](https://learn.microsoft.com/en-us/windows/mixed-reality/distribute/creating-3d-models-for-use-in-the-windows-mixed-reality-home) (.gltf) for animation. 

We encourage builders to fork [XGR-arcadians](https://github.com/alto-io/xgr-arcadians) and define how other collections are rendered.

As more and more projects build on XGR, the vision of permissionless cross-game interoperability will be realized.

## Adding Collections

Adding more and more collections that are XGR-enabled on the [XGR Homepage](https://xgr.opgames.org/) are highly encouraged! 

To do so, simply create a pull request updating the registry on [public/registry/index.json](public/registry/index.json)

## renderer_url

The **renderer_url** is the starting point for XGR-enabling a collection. It has to be in JSON format and retrievable via a URL. 

The XGR-Arcadians example hosts its **renderer_url** on [https://xgr-arcadians.opgames.org/renderer.json](https://xgr-arcadians.opgames.org/renderer.json), and is shown below:

```yaml
{
    name: "Arcadians Renderer",
    description: "Part collections stored in .ora and animation data stored in .gltf",
    project_url: "https://github.com/alto-io/xgr-arcadians",
    image: "https://xgr-arcadians.opgames.org/image/",
    animation_url: "https://xgr-arcadians.opgames.org/animation/",
    playground_url: "https://playground.arcadians.io",
    ora_url: "https://xgr-arcadians.opgames.org/assets/arcadians.ora",
    gltf_url: "https://xgr-arcadians.opgames.org/assets/arcadians.gltf"
}
```

The **name**, **description**, **project_url**, **image**, and **animation_url** fields are required. The **image** and **animation_url** works similarly to how they are used in marketplaces such as Opensea, and will be appended with a tokenid.

The **playground_url**, **ora_url** and **gltf_url** are specific to the XGR-Arcadians implementation. Other implementations can add whichever fields developers will need to support their collection assets.


## Further Work

* XGR-Arcadians uses GLTF, which is more broadly supported on 3D Game engines such as BabylonJS and Unity. An animation implementation for 2D engines such as Phaser would be very useful, perhaps using [.json files for 2d skeletal animation](https://github.com/EsotericSoftware/spine-runtimes/).

* While the [XGR Homepage](https://xgr.opgames.org/) and the [collection registry](public/registry/index.json) makes it easy to update the page with new collections, it is a point of centralization and is not permissionless. Further work on moving this to an on-chain registry similar to [EIP-6551](https://eips.ethereum.org/EIPS/eip-6551) should be explored. 