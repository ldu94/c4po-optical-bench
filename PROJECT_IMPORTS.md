# Imported project inventory

43 source templates, plus the guided double-pass example.

All templates use an enclosing rectangular blank and native component cutters. Read the notes below before fabrication. Original source files are unchanged.

| Source / variant | Components | Import notes |
| --- | ---: | --- |
| 2_output_doublepass.scad | 33 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| 3_output_doublepass.scad | 29 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| baseplate_test1.scad | 4 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| bubbles_674_doublepass.scad | 28 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| catseye-aom-halfinch-polaris.scad | 15 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| catseye-aom-halfinch.scad | 15 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| catseye-aom-v2018-02-26a.scad | 14 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. Source dependency warnings: WARNING: Ignoring unknown module 'aom_on_mount_km200pm' in file /catseye-aom-v2018-02-26a.scad, line 86 WARNING: Ignoring unknown module 'aom_on_mount_km200pm' in file /catseye-aom-v2018-02-26a.scad, line 86 |
| catseye-aom-v2018-02-28a.scad | 13 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. Source dependency warnings: WARNING: Ignoring unknown module 'aom_on_mount_km100pm' in file /catseye-aom-v2018-02-28a.scad, line 91 WARNING: Ignoring unknown module 'aom_on_mount_km100pm' in file /catseye-aom-v2018-02-28a.scad, line 91 |
| catseye-aom-v2018-03-01a.scad | 14 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. Source dependency warnings: WARNING: Ignoring unknown module 'aom_on_mount_km100pm' in file /catseye-aom-v2018-03-01a.scad, line 111 WARNING: Ignoring unknown module 'aom_on_mount_km100pm' in file /catseye-aom-v2018-03-01a.scad, line 111 |
| doublepass_aom.scad | 20 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| doublepass_aom_v2.scad | 20 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| ecdl_support.scad | 4 |  |
| fibernoise_aom.scad | 20 |  |
| fwk_injection.scad | 39 |  |
| injection_lock.scad | 8 |  |
| mixer.scad | 46 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| mixer_bubbles.scad | 56 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| modular_doublepass_aom.scad | 25 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| modular_doublepass_aom_extra_out.scad | 26 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| noise_eater.scad | 27 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| overlap_test_part.scad | 4 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| qzz_baseplate.scad | 21 |  |
| rbLock.scad | 15 |  |
| sample_mirror_mount.scad | 1 |  |
| sample_pinhole_with_head_countersink.scad | 1 |  |
| satabs.scad | 8 | The source vapor-cell mesh ignores its show flag. The importer guards that display-only mesh so it is excluded from drilling; native holder holes and the cylindrical clearance pocket are retained. Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| simple_example.scad | 2 |  |
| splitter_tree_2port.scad | 19 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| splitter_tree_3port.scad | 35 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| splitter_tree_3port_pd.scad | 34 |  |
| triple_aom.scad | 74 |  |
| weebay_rack/2_croc_combiner.scad | 10 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| weebay_rack/461_injection.scad | 42 |  |
| weebay_rack/493_combined.scad | 77 |  |
| weebay_rack/493_injection.scad | 26 |  |
| weebay_rack/bp_on_rack.scad | 34 |  |
| weebay_rack/croc_combiner.scad | 18 |  |
| weebay_rack/rack_4to1_combiner.scad | 31 |  |
| weebay_rack/rack_doublepass_aom.scad | 17 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| weebay_rack/rack_doublepass_aom_v2.scad | 22 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. |
| weebay_rack/single_pass_aom_eom.scad | 15 |  |
| splitter_tree_5port_upstream.scad | 46 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. This is the upstream side of unresolved merge conflicts in splitter_tree_5port.scad. The original source is unchanged; compare these alternatives before using one. |
| splitter_tree_5port_stashed.scad | 49 | Uses the main assembly configuration rather than a machining-only source view. Optional alternate configurations are not separate templates. This is the stashed side of unresolved merge conflicts in splitter_tree_5port.scad. The original source is unchanged; compare these alternatives before using one. |

## Other files

| Source | Classification | Reason |
| --- | --- | --- |
| splitter_tree_5port.scad | unavailable | The source contains unresolved merge conflicts. Both sides are offered as separate alternatives requiring review. |
| weebay_rack/rack_combiners.scad | reference | This combined scene exceeds the editor’s single-plate size or component limit. |
| aom_optomech.scad | library | Shared geometry or parameter library. |
| baseplate_box.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| beams.scad | library | Shared geometry or parameter library. |
| bracket_dmm05.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| bracket_dmm05_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| bracket_ida12.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| bracket_ida12_long.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| bracket_ida12_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| bubbles_modular_params.scad | library | Shared geometry or parameter library. |
| butterfly_laser.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| cheese_non-para_crocs.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| croc_xyz.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| croc_xyz_baseplate.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| croc_xyz_floor_plate.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| croc_xyz_octagon_croc.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| croc_xyz_zadapter.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| dowel_pbs_mount.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| dowel_pbs_mount_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| dpass_aom_label.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| fiber_feedthrough_mount_2019_06_22a.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| fibernoise_aom_baseplate.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| fibernoise_aom_label.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| fwk_injection_lock_label.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| injection_lock_label.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| modular.scad | library | Shared geometry or parameter library. |
| mot_window_bracket.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| motorized_xy.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_brim200.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_brim_120_60_hang.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_brim_km100pm.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_brim_rightside_up_km100pm.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_km100_upside_down.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_km100pm.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_km100pm_ATM200.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_km100pm_gooch_housego.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| mount_periscope2.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| newport_diode_mount.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| newport_optics.scad | library | Shared geometry or parameter library. |
| noise_eater_label.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| octagon_croc.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| optomech.scad | library | Shared geometry or parameter library. |
| paracroc.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| paracroc_stage_plate_Cheese.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| periscope_base.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| power_meter_bracket.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| rbLock_baseplate.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| rbLock_label.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| rbOven_clamp.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| rb_cell_holder.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| reducer_nipple_redrill.scad | specialty | Chamber, stage, or flange hardware; not a planar optical base-plate layout. |
| skate_mount_halfinch_pbs_bit_larger.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| skate_mount_pbs.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| skate_mount_pbs_bit_larger.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| skate_mount_pbs_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| skate_mount_pbs_set_20.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adapter_cage_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adapter_ida12.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adapter_newport_isolator.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adapter_newport_isolator_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_cage.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_cage_mount.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_ida12.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_ida12_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_io_3D_850.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_pda10a.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_rsp05.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_rsp05_low_profile.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| surface_adaptor_rsp05_low_profile_set.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| thorlabs_optomech.scad | library | Shared geometry or parameter library. |
| toptica_optics.scad | library | Shared geometry or parameter library. |
| translation_stages.scad | library | Shared geometry or parameter library. |
| upside_down_mount_km100pm_ATM200.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
| util.scad | library | Shared geometry or parameter library. |
| vapor_cell_holder.scad | part | Individual adapter, fixture, label, fabrication set, or plate-only companion; not a separate optical layout. |
