/* ============================================================
   script.js – JavaScript Utama Landing Page HistPath

   File ini berisi:
   1. Hamburger menu untuk mobile
   2. Smooth scroll saat klik link navigasi
   3. Navbar berubah saat discroll
   4. Animasi section muncul saat discroll
   5. Penanganan gambar yang gagal dimuat
============================================================ */

/* ============================================================
   1. HAMBURGER MENU – Buka / tutup menu di mobile
============================================================ */

// Ambil elemen hamburger dan menu dari HTML
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

// Saat tombol hamburger diklik
hamburger.addEventListener('click', function () {
  // Tambah atau hapus kelas 'open' untuk membuka/menutup menu
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

/* ============================================================
   2. TUTUP MENU saat salah satu link diklik (khusus mobile)
============================================================ */

// Ambil semua link navigasi
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    // Tutup menu mobile setelah link diklik
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ============================================================
   3. NAVBAR SCROLLED – Tambah efek bayangan saat discroll
============================================================ */

const navbar = document.getElementById('navbar');

// Fungsi yang dijalankan setiap kali pengguna scroll
window.addEventListener('scroll', function () {
  // Jika sudah scroll lebih dari 20px, tambahkan kelas 'scrolled'
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Panggil juga fungsi animasi scroll
  animasiScroll();
  aktifkanNavLink();
});

/* ============================================================
   4. ANIMASI SCROLL – Elemen muncul saat terlihat di layar
============================================================ */

// Ambil semua elemen yang punya kelas 'animate-on-scroll'
const elemen = document.querySelectorAll('.animate-on-scroll');

function animasiScroll() {
  elemen.forEach(function (el) {
    // Dapatkan posisi elemen relatif terhadap viewport (layar)
    const rect = el.getBoundingClientRect();

    // Jika elemen sudah masuk 90% area layar, tambahkan kelas 'visible'
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });
}

// Jalankan animasi sekali saat halaman pertama kali dimuat
animasiScroll();

/* ============================================================
   5. ACTIVE NAV LINK – Highlight link yang sedang aktif
============================================================ */

function aktifkanNavLink() {
  // Ambil semua section yang punya id
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(function (section) {
    const sectionTop    = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const scrollPos     = window.scrollY;

    // Cek apakah posisi scroll ada di dalam section ini
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      // Hapus 'active' dari semua link
      navLinks.forEach(function (link) {
        link.classList.remove('active');
      });

      // Tambahkan 'active' ke link yang sesuai dengan id section
      const activeLink = document.querySelector('.nav-link[href="#' + section.id + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

/* ============================================================
   6. PENANGANAN GAMBAR GAGAL DIMUAT (Error Handling)
   Jika gambar tidak bisa dimuat, tampilkan fallback
============================================================ */

// Ambil semua gambar yang punya atribut data-fallback
const semuaGambar = document.querySelectorAll('img[data-fallback]');

semuaGambar.forEach(function (img) {
  // Cek apakah src gambar kosong atau tidak ada
  if (!img.src || img.src === window.location.href) {
    // Gambar tidak ada, langsung tampilkan fallback
    tampilkanFallback(img);
    return;
  }

  // Jika src ada tapi gagal dimuat, tampilkan fallback
  img.addEventListener('error', function () {
    tampilkanFallback(img);
  });
});

// Fungsi untuk menampilkan fallback saat gambar gagal
function tampilkanFallback(img) {
  // Sembunyikan gambar yang gagal
  img.style.display = 'none';

  // Cari elemen fallback yang berdekatan (saudara setelahnya)
  const parent   = img.parentElement;
  const fallback = parent.querySelector('.img-fallback, .foto-fallback');

  if (fallback) {
    fallback.style.display = 'flex';
  }
}

/* ============================================================
   7. SMOOTH SCROLL – Pastikan scroll halus saat klik link hash
   (CSS scroll-behavior: smooth sudah menangani ini,
    script ini sebagai backup untuk browser lama)
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      // Scroll ke section tujuan dengan posisi yang tepat
      const offsetTop = target.offsetTop - 80; // dikurangi tinggi navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* ============================================================
   SELESAI – Semua fungsi sudah terdaftar.
   Browser akan menjalankannya secara otomatis.
============================================================ */
