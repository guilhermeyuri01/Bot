# Production 3D assets

Place licensed photorealistic assets here. The runtime is prepared for lazy-loaded GLB/GLTF files with Draco meshes and KTX2 texture payloads, without requiring future refactors.

Recommended structure:

```txt
public/models/avatar/female-realistic.draco.glb
public/models/hair/long-straight.ultra.glb
public/models/hair/long-straight.high.glb
public/models/hair/long-straight.medium.glb
public/models/hair/long-straight.low.glb
public/models/hair/{curly,wavy,bob,ponytail,layered,wolf,butterfly}.{ultra,high,medium,low}.glb
public/textures/hair/*.ktx2
```

Optimization pipeline before deploy:

1. Export separate LOD meshes per hairstyle.
2. Run `gltf-transform optimize input.glb output.glb --compress draco --texture-compress ktx2`.
3. Keep draw calls low by merging static hair cards and using shared PBR material slots.
4. Use normal, roughness, AO and anisotropy maps for premium hair response.
