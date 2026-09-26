//------------------------------------//
//  Brimrose AOMs in OpenSCAD format  //
//------------------------------------//
//
// All units are in mm
//
// Each of the AOM modules draws the AOM with the laser hole centered on the origin


//--------------------------------------------------------------------------
// Global parameters
in_to_mm = 25.4;

d_inch = 25.4;
screw_clear_dia_4_40 = 0.120 * d_inch;
screw_tap_dia_4_40   = 0.089 * d_inch;

module brimrose_tef_200_100 (show=true, drill=false, use_four_holes=true) {
     //
     // use_four_holes: true if four holes should be drilled to mount AOM onto surface, instead of just two holes
     // 
    //--------------------------------------------------------------------------
    // Parameters for TEF-200-100
    base_width             = 42.80;
    base_height            = 3.12;
    base_depth             = 13.0;

    base_hole_dia          = 3.2;
    base_hole_length       = 6.20; //stretched hole, measured from center-to-center
    base_hole_depth_offset = (base_depth - base_hole_length)/2;
    base_hole_offset_1     = 3.2;
    base_hole_offset_2     = base_width - base_hole_offset_1;

    body_width             = 30.60;
    body_height            = 22.40 - base_height;
    body_depth             = base_depth;

    laser_hole_dia         = 3.5;
    laser_hole_height      = 6.5; //height measured from bottom of base
    laser_hole_offset      = 16.2; //horizontal position measured from left edge of base

    sma_base_side          = 13.0;
    sma_base_height        = 1.6;
    sma_center_offset      = (base_width-body_width)/2 + 5.5;
    sma_height             = 8.0;
    sma_dia                = 6.25;
    //--------------------------------------------------------------------------
    if (show){
	 translate(v=[-laser_hole_offset, -base_depth/2, -laser_hole_height]) {
	      //Base with holes for screw attachment
	      difference() {
		   cube(size = [base_width, base_depth, base_height], center = false);
		   hull() {
			translate(v=[base_hole_offset_1, base_hole_depth_offset, -base_height/2])
			     cylinder(h=base_height*2, r=base_hole_dia/2, $fn=100);
			translate(v=[base_hole_offset_1, base_hole_depth_offset+base_hole_length, -base_height/2])
			     cylinder(h=base_height*2, r=base_hole_dia/2, $fn=100);
		   }
		   hull() {
			translate(v=[base_hole_offset_2, base_hole_depth_offset, -base_height/2])
			     cylinder(h=base_height*2, r=base_hole_dia/2, $fn=100);
			translate(v=[base_hole_offset_2, base_hole_depth_offset+base_hole_length, -base_height/2])
			     cylinder(h=base_height*2, r=base_hole_dia/2, $fn=100);
		   }
	      }
	      //Body with hole for laser access
	      difference() {
		   body_offset = (base_width - body_width)/2.0;
		   translate(v=[body_offset, 0.0, base_height])
			cube(size=[body_width, body_depth, body_height], center= false);        
		   translate(v=[laser_hole_offset, -base_depth/2, laser_hole_height])
			rotate(a=[-90.0, 0.0, 0.0])
			cylinder(h=base_depth*2, r=laser_hole_dia/2, $fn=100);
	      }
	      //SMA connector
	      translate(v=[sma_center_offset, base_depth/2, base_height+body_height+sma_base_height/2])
		   cube(size=[sma_base_side, sma_base_side, sma_base_height], center=true);
	      translate(v=[sma_center_offset, base_depth/2, base_height+body_height+sma_base_height])
		   cylinder(h=sma_height, r=sma_dia/2, $fn=100);
	 }
    }
    if (drill){
	 // holes for mounting
	 translate(v=[-laser_hole_offset, -base_depth/2, -laser_hole_height]) {
	      color("red"){
		   for (xp=[base_hole_offset_1, base_hole_offset_2]){
			translate(v=[xp, base_hole_depth_offset+base_hole_length/2, -base_height/2-80])
			     if (use_four_holes){
				  for (dy=[-1, 1]){
				       translate([0, dy * (base_hole_length/2 - 0*screw_clear_dia_4_40/2), 0])
					    cylinder(h=100, d=screw_tap_dia_4_40, $fn=100);	// change to clear_dia to double-check clearance
				  }
			     }else{
				  cylinder(h=100, d=screw_tap_dia_4_40, $fn=100);		// maybe should be M3 instead of 4-40
			     }
		   }
	      }
	 }
    }
}

module brimrose_tef_80_40() {
    //--------------------------------------------------------------------------
    // Parameters for TEF-80-40
    base_width              = 45.20;
    base_height             = 22.90;
    base_depth              = 35;
    
    laser_hole_dia          = 3.5;
    laser_hole_height       = 16.5; //height measured from bottom of base
    laser_hole_offset       = 26.0; //horizontal position measured from left edge of base
    
    screw_hole_depth_offset = 17.5;
    screw_hole_offset_1     = 17.0;
    screw_hole_offset_2     = 42.4;
    screw_hole_depth        = 3.0;
    screw_hole_dia          = 2.3;
    
    sma_depth_offset        = 22.3;
    sma_height_offset       = 15.7;
    sma_height              = 7.8;
    sma_dia                 = 6.25;
    //--------------------------------------------------------------------------
    translate (v=[-laser_hole_offset, -base_depth/2, -laser_hole_height]) {
        //Body with hole for laser access and holes for screw attachment
        difference() {
            cube(size = [base_width, base_depth, base_height], center = false);
            translate(v=[screw_hole_offset_1, screw_hole_depth_offset, -screw_hole_depth/2])
             cylinder(h=screw_hole_depth*1.5, r=screw_hole_dia/2, $fn=100);
            translate(v=[screw_hole_offset_2, screw_hole_depth_offset, -screw_hole_depth/2])
             cylinder(h=screw_hole_depth*1.5, r=screw_hole_dia/2, $fn=100);
            translate(v=[laser_hole_offset, -base_depth/2, laser_hole_height])
             rotate(a=[-90.0, 0.0, 0.0])
              cylinder(h=base_depth*2, r=laser_hole_dia/2, $fn=100);
        }
        //SMA connector
        translate(v=[0.0, sma_depth_offset, sma_height_offset])
         rotate(a=[0.0, -90.0, 0.0])
         cylinder(h=sma_height, r=sma_dia/2, $fn=100);
    }
}

module intraaction_atd1201a2() {
     //
     // intraaction ATD120 is mechanically identical to isomet 1205C-x
     //
     isomet_1205c();
}

module isomet_1205c() {
    //--------------------------------------------------------------------------
    // Parameters for Isomet 1205C-x
    base_width              = 50.76;
    base_height             = 16.00;
    base_depth              = 22.34;
    
    laser_hole_dia          = 1.5;
    laser_hole_height       = 6.98; //height measured from bottom of base
    laser_hole_offset       = 32.99; //horizontal position measured from left edge of base
    
    screw_hole_depth_offset = 11.17;
    screw_hole_offset_1     = 6.35;
    screw_hole_offset_2     = 44.42;
    screw_hole_depth        = 3.0;
    screw_hole_dia          = 2.3;
    
    sma_depth_offset        = 13.5;
    sma_height_offset       = 8.5;
    sma_height              = 7.8;
    sma_dia                 = 6.25;
    //--------------------------------------------------------------------------
    translate(v=[-laser_hole_offset, -base_depth/2, -laser_hole_height]) {
        //Body with hole for laser access and holes for screw attachment
        difference() {
            cube(size = [base_width, base_depth, base_height], center = false);
            translate(v=[screw_hole_offset_1, screw_hole_depth_offset, -screw_hole_depth/2])
             cylinder(h=screw_hole_depth*1.5, r=screw_hole_dia/2, $fn=100);
            translate(v=[screw_hole_offset_2, screw_hole_depth_offset, -screw_hole_depth/2])
             cylinder(h=screw_hole_depth*1.5, r=screw_hole_dia/2, $fn=100);
            translate(v=[laser_hole_offset, -base_depth/2, laser_hole_height])
             rotate(a=[-90.0, 0.0, 0.0])
              cylinder(h=base_depth*2, r=laser_hole_dia/2, $fn=100);
        }
        //SMA connector
        translate(v=[0.0, sma_depth_offset, sma_height_offset])
         rotate(a=[0.0, -90.0, 0.0])
         cylinder(h=sma_height, r=sma_dia/2, $fn=100);
    }
}


screw_tap_dia_6_32   = 0.1065 * d_inch;

module gooch_housego_3080(show=true, drill=false, drill_dia=screw_tap_dia_6_32){
     // Gooch-Housego AOM with beam path center at origin
     // SMB connector along -x
     gh_base_dx = 2.0 * d_inch;
     gh_base_dy = 1.0 * d_inch;
     gh_base_dz = 0.1 * d_inch;
     center_xoff = (2-0.7) * d_inch;
     center_zoff = 0.275 * d_inch;
     center_dz = 0.53 * d_inch;
     center_dx = 1.5 * d_inch; // estimate
     beam_dia = 3;
     smb_dia = 5;
     slot_dia = 2 * 0.078 * d_inch;	// about 4 mm
     slot_dy = 0.12 * d_inch;	// estimated
     slot_xoff = 1.75 * d_inch/2;
     module slot(){
	  hull(){
	       for(m=[-1, 1]){
		    translate([0, m*slot_dy/2, -1]) cylinder(d=slot_dia, h=50, $fn=100);
	       }
	  }
     }
     module aom(){
	  difference(){
	       union(){
		    translate([-center_xoff, -gh_base_dy/2, -center_zoff]){
			 color("silver") cube([gh_base_dx, gh_base_dy, gh_base_dz]);
			 translate([0.25 * d_inch, 0, 0])
			      color("blue") cube([center_dx, gh_base_dy, center_dz]);
		    }
		    // smb
		    translate([(-1.3 + 0.25)*d_inch, gh_base_dy/4, 0])
			 rotate([0, -90, 0])
			 color("orange") cylinder(d=smb_dia, h=6, $fn=100);
	       }
	       // beam path through center of AOM crystal
	       translate([0, 50, 0])
		    rotate([90, 0, 0])
		    color("red") cylinder(d=beam_dia, h=100, $fn=100);
	       // mounting screw slots
	       for(m=[-1, 1]){
		    translate([-center_xoff + gh_base_dx/2 + m * slot_xoff, 0, -10]){
			 color("red") slot();
		    }
	       }
	  }
     }
     if (show){
	  aom();
     }
     if (drill){
	  for(m=[-1, 1]){
	       translate([-center_xoff + gh_base_dx/2 + m * slot_xoff, 0, -49]){
		    color("red") cylinder(d=drill_dia, h=50, $fn=100);
	       }
	  }
     }
}

//module aom_adapter () {
//    
//}

//translate(v=[0.2*in_to_mm, 1.0*in_to_mm, -0.75*in_to_mm]) //center on post hole at pedestal height
//translate(v=[-0.975*in_to_mm, 1.965*in_to_mm, -0.75*in_to_mm]) //center on pedestal corner at pedestal height
// rotate(a=[90, 0, -90])
//  scale(1000){
//      import("thorlabs/KM100PM-Solidworks.stl");
//  }

//adapter_width = 60.0;
//adapter_depth = 35.0;
//adapter_height = 10.0;
//
//adapter_cut_depth = adapter_depth - 14.0;
//adapter_cut_width = 20.0;
//
//difference() {
//    cube(size = [adapter_depth, adapter_width, adapter_height]);
//    translate(v=[0.0, adapter_width - adapter_cut_width, -adapter_height/2])
//     cube(size = [adapter_cut_depth, adapter_cut_width, adapter_height*2]);
//}



translate(v=[-70.0, 0.0, 0.0])
 brimrose_tef_200_100();

if (1){
     translate(v=[70.0, 0.0, 0.0])
	  brimrose_tef_80_40();
}
 
if (1){
     translate([140, 0, 0]){
	  isomet_1205c();
     }
}

if (1){
     gooch_housego_3080(drill=false);
}
