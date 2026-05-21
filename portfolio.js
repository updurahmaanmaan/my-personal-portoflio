 function showPage(id, btn) {
      // hide all pages
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      // show target
      document.getElementById('page-' + id).classList.add('active');
      // update nav active state
      document.querySelectorAll('.sb-nav button').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      // scroll to top
      window.scrollTo(0, 0);
      // re-run reveal for the new page
      triggerReveal();
      // animate bars if skills page
      if (id === 'skills') animateBars();
    }

    // ── Scroll reveal
    function triggerReveal() {
      const els = document.querySelectorAll('.page.active .reveal');
      els.forEach(el => el.classList.remove('visible'));
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      setTimeout(() => els.forEach(el => io.observe(el)), 30);
    }

    // ── Progress bars
    function animateBars() {
      setTimeout(() => {
        document.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
      }, 300);
    }

    // Initial reveal for home page
    triggerReveal();