function jalan(orang) {
  // menghilangkan menu
  if (pulang) {
    putar_balik(orang);
  } else {
    orang.position.z += langkah;
  }
  // posisi di depan petugas
  if (orang.position.z > 200) {
    $("#suhu").html(suhu);
    hitungMundur();
    if (!pulang) {
      orang.position.z -= langkah;
    }
    if (terima) {
      belok_kanan(orang);
    }
  } // posisi sudah meninggalkan tempat ke belakang
  else if (orang.position.z < -400) {
    reset(orang);
  } // posisi sudah meninggalkan tempat ke kiri
  else if (orang.position.x < -400) {
    reset(orang);
  }
}

function belok_kiri(orang) {
  if (orang.rotation.y <= Math.PI / 2) {
    orang.rotation.y += 0.01;
  }
  orang.position.x += langkah;
}

function belok_kanan(orang) {
  orang.position.z -= langkah;
  orang.position.x -= langkah;
  if (orang.rotation.y >= -Math.PI / 2) {
    orang.rotation.y -= 0.05;
  }
}

function putar_balik(orang) {
  if (orang.rotation.y <= Math.PI / 2) {
    orang.rotation.y += 0.05;
    orang.position.z += langkah;
    orang.position.x += langkah;
  } else if (orang.rotation.y <= Math.PI) {
    orang.rotation.y += 0.05;
    orang.position.z -= langkah;
    orang.position.x += langkah;
  } else {
    orang.position.z -= langkah;
  }
}

function reset(orang) {
  $(".menu").hide();
  skor = hitungSkor(skor, suhu, terima, pulang);
  orang.position.x = 0;
  orang.position.y = 0;
  orang.position.z = -400;
  orang.rotation.y = 0;
  pulang = false;
  terima = false;
  detik = cekLevel();
  timer = 5 * detik;
  suhu = getSuhu();
}

function removeEntity(object) {
  var selectedObject = scene.getObjectByName(object.name);
  scene.remove( selectedObject );
}

function cekLevel() {
  if (level == 1 && skor == 3) {
    level = 2;
    skor = 0;
    alertLevel(2);
    removeEntity(starbucks);
    scene.add(mcdonalds);
  } else if (level == 2 && skor == 5) {
    level = 3;
    skor = 0;
    alertLevel(3);
    removeEntity(mcdonalds);
    scene.add(japanese);
  } else if (level == 3 && skor == 10) {
    level = 4;
    skor = 0;
    alertLevel(4);
  } else if (skor <= -3) {
    alert('anda kalah')
    location.reload(true);
  }
  $("#level").html(level);
  return 60 - 15 * level;
}

function alertLevel(lvl) {
  alert("Selamat anda naik level menjadi lvl" + lvl + " !!");
  $("#skor").html(skor);
}

function getSuhu() {
  var suhu = Math.ceil((36 + Math.random() * 2) * 10) / 10;
  return suhu;
}

function hitungSkor(skor, suhu, terima, pulang) {
  if (timer <= 0) {
    console.log("AAAAAAAA");
    skor -= 1;
  } else if (suhu <= 37.0) {
    if (terima) {
      skor += 1;
    } else {
      skor -= 1;
    }
  } else {
    if (pulang) {
      skor += 1;
    } else {
      skor -= 1;
    }
  }
  $("#skor").html(skor);
  return skor;
}

function hitungMundur() {
  if (!pulang && !terima) {
    $(".menu").show();
  } else {
    $(".menu").hide();
  }
  let counttext = Math.ceil(timer / detik);
  $("#countdown").html(counttext);
  if (timer <= 0) {
    if (!terima) {
      pulang = true;
    }
  } else if (!terima && !pulang) {
    timer -= 1;
  }
}

function setCountdownText(text) {
  $("#countdown").html(text);
}

// function thermo_putar(orang, thermometer, zpatok, thermo_sudut_awal){
//   let x = Math.max(Math.abs(orang.position.x - thermometer.position.x), 1);
//   let y = Math.max(Math.abs(orang.position.y - thermometer.position.y), 1);
//   let w = Math.max(Math.abs(orang.position.z - zpatok), 1);
//   let a_square = (x*x) + (w*w);
//   let b = Math.max(Math.abs(thermometer.position.z - zpatok), 1);
//   let b_square = b*b;
//   let c_square = (x*x) + (y*y);
//   let c = Math.sqrt(c_square);
//   let cosA = (b_square + c_square - a_square)/(2*b*c);
//   let angle = Math.acos(cosA);
//   thermometer.rotation.y = angle;
// }
