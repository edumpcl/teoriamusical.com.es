// /en/about/ — English version of /sobre-mi/ (author page, E-E-A-T). Custom shell: ProfilePage + BreadcrumbList.
const SITE = 'https://www.teoriamusical.com.es';
const path = '/en/about/';
const title = 'About Eduardo Escrig Zomeño | Music Theory';
const description = 'Eduardo Escrig Zomeño, a musicologist and music theory and percussion teacher with over 15 years of experience, and the author of this website.';

module.exports = {
  path,
  esPath: '/sobre-mi/',
  lastmod: '2026-11-10',
  title,
  description,
  ogImage: '/assets/img/og-pages/og-en-about.png',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'ProfilePage', url: SITE + path, inLanguage: 'en',
      mainEntity: {
        '@type': 'Person', name: 'Eduardo Escrig Zomeño', url: SITE + path,
        jobTitle: 'Music language and percussion teacher',
        description: 'Higher Music Degree in Musicology from the Joaquín Rodrigo Higher Conservatory of Music in Valencia, and music language (theory and solfège) and percussion teacher with more than 15 years of teaching experience. Author of teoriamusical.com.es.',
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Conservatorio Superior de Música de Valencia Joaquín Rodrigo' },
          { '@type': 'EducationalOrganization', name: 'Conservatorio Profesional de Música de Torrent' },
        ],
        knowsAbout: ['Music theory', 'Music language (solfège)', 'Harmony', 'Musicology', 'Percussion', 'Band and choir conducting', 'Music notation editing'],
        worksFor: { '@type': 'Organization', name: 'Escuela de Música Círculo Católico de Torrent', url: 'https://escuelamusicacctorrent.com/' },
        sameAs: ['https://eduardoescrig.com.es/', 'https://escuelamusicacctorrent.com/', 'https://solfeante.com/', 'https://tacetpro.com/'],
        nationality: { '@type': 'Country', name: 'Spain' },
      },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/en/' },
        { '@type': 'ListItem', position: 2, name: 'About', item: SITE + path },
      ],
    },
  ],
  main: `
  <nav class="tm-breadcrumb" aria-label="Breadcrumb">
    <div class="tm-container">
      <a href="/en/">Home</a><span class="tm-crumb-sep">›</span><span aria-current="page">About</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>About me</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<p>My name is <strong>Eduardo Escrig Zomeño</strong> and I am the author of <strong>teoriamusical.com.es</strong>. I hold a <strong>Higher Music Degree in Musicology</strong> and I have spent more than fifteen years teaching <strong>music language</strong> (the Spanish name for music theory and solfège) and <strong>percussion</strong>. This website grew out of that daily work in the classroom: explaining music theory as clearly and rigorously as possible, with examples on the staff and plain language, for conservatory students and for anyone who wants to understand music.</p>

<p><em>Some of the titles and institutions below belong to the Spanish music education system. I have added a short English equivalent where it helps.</em></p>

<h2>Education</h2>

<ul>
  <li><strong>Higher Music Degree (<em>Título Superior de Música</em>), Musicology specialty</strong> (equivalent to a university bachelor's degree) — Joaquín Rodrigo Higher Conservatory of Music, Valencia.</li>
  <li><strong>Professional Music Diploma (<em>Título Profesional de Música</em>), percussion</strong> — Torrent Professional Conservatory of Music (teachers Pau Ballester and Ángel García).</li>
  <li><strong>High school diploma (<em>Bachiller</em>)</strong>, Natural Sciences and Health track.</li>
</ul>

<h2>Teaching experience</h2>

<p>Teaching is my main work, and it is the foundation of everything on this website:</p>

<ul>
  <li><strong>Music language teacher</strong> at the Círculo Católico de Torrent Music School (from the 2017/2018 school year to the present).</li>
  <li><strong>Percussion teacher</strong> at the Círculo Católico de Torrent Music School (since 2007/2008), at the C.I.M. Unión Musical de Sot de Chera and at the Unió Musical d'Alaquàs.</li>
  <li><strong>Head of Studies</strong> of the Círculo Católico de Torrent Music School (from the 2016/2017 school year to the present).</li>
  <li><strong>Conductor</strong> of the Sot de Chera Children's Band, the Círculo Católico de Torrent Senior's Band, the Alaquàs Beginners' Band and the Círculo Católico de Torrent Percussion Ensemble.</li>
  <li><strong>Teacher trainer</strong> in music notation software (MuseScore courses taught in 2016 and 2017).</li>
  <li><strong>Founding member</strong> of the percussion group "Maça p'a la Carabassa" and of the Joven Orquesta Sinfónica Solidaria de Valencia (the Valencia Solidarity Youth Symphony Orchestra, 2005).</li>
  <li><strong>Creator of the website</strong> of the Círculo Católico de Torrent Music School: <a href="https://escuelamusicacctorrent.com/" target="_blank" rel="noopener">escuelamusicacctorrent.com</a> (in Spanish).</li>
</ul>

<h2>Continuing education</h2>

<p>I complement my degrees with ongoing training, especially in music language pedagogy and conducting:</p>

<ul>
  <li><strong>Music language pedagogy:</strong> several courses on "Resources and strategies for teaching music language" (i-Musi training), "Music 2.0: developing digital competence", "Time for creativity: musical creation as a space for learning" and ICT training for teachers.</li>
  <li><strong>Conducting:</strong> Orchestral Conducting Course (maestro Gevorg Sargsyan), 2016 Conducting Course, and the first and second Choral Conducting Courses (Rafael Sánchez Mombiedro and María Tamarit).</li>
  <li><strong>Percussion:</strong> the "Ciutat de Llíria" performance courses, the "Mariano Puig" International Course, and percussion and solmization courses at the Málaga Higher Conservatory.</li>
  <li><strong>Contemporary music:</strong> "Twentieth-century music and its performance" (professor Daniel Kientzy).</li>
  <li><strong>Management and performance:</strong> "Music and dance schools: organization and management" and "Mental training for performance".</li>
</ul>

<h2>Current projects</h2>

<p>Besides teaching, I run two projects in music education:</p>

<ul>
  <li><strong><a href="https://solfeante.com/" target="_blank" rel="noopener">Solfeante</a></strong> — a <strong>music language</strong> method (in Spanish) that brings students the same way of learning that I use in the classroom.</li>
  <li><strong><a href="https://tacetpro.com/" target="_blank" rel="noopener">TacetPro</a></strong> — a <strong>management program for music schools and centers</strong> (in Spanish).</li>
</ul>

<h2>Why this website</h2>

<p>After years of explaining the same concepts in class, I wanted to gather that knowledge in an open, free place. Every page of the <a href="/diccionario-musical/">music dictionary</a>, every <a href="/ejercicios/">interactive exercise</a> and every <a href="/herramientas/">tool</a> is made with the same standard I use to prepare my lessons: rigor, clarity and practical examples. If you find a mistake or want to suggest a topic, you can write to me from the <a href="/contacto/">contact</a> page (in Spanish).</p>

  </article>
</div>`,
};
