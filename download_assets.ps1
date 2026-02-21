$assets = @{
    "bg_lobby.png" = "https://i.ibb.co/4wjvz63k/neon-drop-asset-lobby.png"
    "bg_design_lab.png" = "https://i.ibb.co/YFB8q2x4/neon-drop-asset-design-lab.png"
    "bg_ops_center.png" = "https://i.ibb.co/1ftJ0Sz1/neon-drop-asset-ops-center.png"
    "bg_cfo_office.png" = "https://i.ibb.co/B2jVsFfK/neon-drop-asset-cfo-office-night.png"
    "bg_pump_room.png" = "https://i.ibb.co/Z6Zv5rJb/neon-drop-asset-pump-room.png"
    "bg_valuation.png" = "https://i.ibb.co/8nywqxyb/neon-drop-asset-valuation-station.png"
    "bg_drop_room.png" = "https://i.ibb.co/svm93d9W/neon-drop-asset-drop-room.png"
    "char_jules.png" = "https://i.ibb.co/kgXrYjsW/neon-drop-asset-jules.png"
    "char_rob.png" = "https://i.ibb.co/B5gkh7LV/neon-drop-asset-rob.png"
    "char_kai.png" = "https://i.ibb.co/Tnk6fL7/neon-drop-asset-kai.png"
    "char_avatar_d.png" = "https://i.ibb.co/prJhmSRt/neon-drop-asset-avatar-d.png"
    "char_avatar_a.png" = "https://i.ibb.co/jk1ZQsG8/neon-drop-asset-avatar-a.png"
    "char_avatar_b.png" = "https://i.ibb.co/kgz13hWt/neon-drop-asset-avatar-b.png"
    "char_avatar_c.png" = "https://i.ibb.co/4ZVj6Knp/neon-drop-asset-avatar-c.png"
    "prop_gatekeeper.png" = "https://i.ibb.co/mVQpw3nk/neon-drop-asset-gatekeeper.png"
    "ui_invoice_frame.png" = "https://i.ibb.co/jPsLrfm1/neon-drop-asset-ui-invoice-card.png"
    "ui_dept_map.png" = "https://i.ibb.co/5gSVQfLc/neon-drop-asset-ui-factory-map.png"
    "icon_valve.png" = "https://i.ibb.co/tPQ8pfSV/neon-drop-asset-prop-valve.png"
    "icon_launch.png" = "https://i.ibb.co/Pvsd9ff7/neon-drop-asset-prop-launch-button.png"
    "icon_box.png" = "https://i.ibb.co/9m2CgDBL/neon-drop-asset-icon-box.png"
    "icon_data.png" = "https://i.ibb.co/cK1f08xG/neon-drop-asset-icon-data.png"
    "icon_needle.png" = "https://i.ibb.co/W4YdtrZS/neon-drop-asset-icon-needle.png"
    "icon_fabric.png" = "https://i.ibb.co/Lz21MztK/neon-drop-asset-icon-fabric.png"
    "vfx_pipes.png" = "https://i.ibb.co/YBg0Trtw/neon-drop-asset-vfx-pipes.png"
    "vfx_cloud.png" = "https://i.ibb.co/G3csR2jd/neon-drop-asset-vfx-cloud.png"
    "ui_boba.png" = "https://i.ibb.co/6c1FhDS7/neon-drop-asset-ui-boba.png"
    "item_hoodie.png" = "https://i.ibb.co/1JG7QFvb/neon-drop-asset-item-hoodie.png"
}

$targetDir = "public\assets\images"
if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir }

foreach ($name in $assets.Keys) {
    $url = $assets[$name]
    $path = Join-Path $targetDir $name
    Write-Host "Downloading $name from $url..."
    Invoke-WebRequest -Uri $url -OutFile $path
}
