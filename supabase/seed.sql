-- Seed data (Indian exams) with real, exam-oriented content.
-- You can run this after schema.sql in Supabase SQL editor.

-- Domains
insert into public.domains (name, slug, description)
values
  ('Engineering', 'engineering', 'Engineering entrance exams for B.Tech/B.E. and related programs.'),
  ('Medical', 'medical', 'Medical entrance exams for MBBS/BDS and allied health programs.'),
  ('Government', 'government', 'Government recruitment and civil services examinations.'),
  ('Management', 'management', 'MBA and management entrance exams.'),
  ('Banking', 'banking', 'Banking recruitment exams by IBPS, SBI and others.'),
  ('Insurance', 'insurance', 'Insurance sector recruitment and related exams.'),
  ('Law', 'law', 'Law entrance exams for UG and PG law admissions.'),
  ('Defence', 'defence', 'Defence recruitment and officer entry examinations.'),
  ('Teaching', 'teaching', 'Teaching eligibility and recruitment exams.'),
  ('Design & Architecture', 'design', 'Design, architecture and creative entrance exams.'),
  ('Science & Research', 'science', 'Research fellowships, NET/JRF and science admissions.'),
  ('Arts, Commerce & General Degree', 'arts-commerce', 'CUET and general university entrance exams.'),
  ('Polytechnic, ITI & Skill', 'skill', 'Polytechnic, ITI and skill/certification pathways.'),
  ('Study Abroad & Language', 'study-abroad', 'International tests like IELTS/TOEFL/GRE/SAT.'),
  ('State Government (PSC)', 'state-government', 'State PSC exams like UPPSC, BPSC, TNPSC etc.'),
  ('PSU & Other Government', 'psu', 'Railway, PSU and other central govt recruitment exams.'),
  ('SSC', 'ssc', 'Staff Selection Commission exams (CGL/CHSL/MTS etc.).')
on conflict (slug) do nothing;

-- Exams
insert into public.exams (
  name,
  slug,
  short_name,
  level,
  conducting_body,
  application_mode,
  exam_mode,
  frequency,
  official_website,
  popularity_rank,
  upcoming_from
)
values
  (
    'JEE Main',
    'jee-main',
    'JEE Main',
    'national',
    'NTA (National Testing Agency)',
    'Online application',
    'Computer Based Test (CBT)',
    'Multiple sessions (typically 2 per year)',
    'https://jeemain.nta.nic.in/',
    1,
    null
  ),
  (
    'NEET UG',
    'neet-ug',
    'NEET',
    'national',
    'NTA (National Testing Agency)',
    'Online application',
    'Pen & Paper (OMR based)',
    'Once a year',
    'https://neet.nta.nic.in/',
    2,
    null
  ),
  (
    'UPSC Civil Services Examination',
    'upsc-cse',
    'UPSC CSE',
    'national',
    'UPSC (Union Public Service Commission)',
    'Online application',
    'Offline (Prelims) + Written (Mains) + Interview',
    'Once a year',
    'https://www.upsc.gov.in/',
    3,
    null
  )
on conflict (slug) do nothing;

-- Additional exams (catalog)
insert into public.exams (
  name,
  slug,
  short_name,
  level,
  conducting_body,
  application_mode,
  exam_mode,
  frequency,
  official_website,
  popularity_rank,
  upcoming_from
)
values
  -- Medical & Healthcare
  ('NEET PG', 'neet-pg', 'NEET PG', 'national', 'NBEMS (National Board of Examinations in Medical Sciences)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://natboard.edu.in/', 18, null),
  ('INI CET', 'ini-cet', 'INI CET', 'national', 'AIIMS / INI Consortium', 'Online application', 'Computer Based Test (CBT)', 'Twice a year', 'https://www.aiimsexams.ac.in/', 22, null),
  ('FMGE', 'fmge', 'FMGE', 'national', 'NBEMS (National Board of Examinations in Medical Sciences)', 'Online application', 'Computer Based Test (CBT)', 'Typically twice a year', 'https://natboard.edu.in/', 55, null),
  ('DNB PDCET', 'dnb-pdcet', 'DNB PDCET', 'national', 'NBEMS (National Board of Examinations in Medical Sciences)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://natboard.edu.in/', 70, null),
  ('B.Sc Nursing Entrance', 'bsc-nursing-entrance', 'BSc Nursing', 'other', null, 'Online application', 'Varies by institute', 'Varies', null, 92, null),
  ('Paramedical Entrance Exams', 'paramedical-entrance-exams', 'Paramedical', 'other', null, 'Online application', 'Varies by institute', 'Varies', null, 98, null),
  ('AIIMS UG (Merged into NEET UG)', 'aiims-ug', 'AIIMS UG', 'other', 'Merged into NEET UG', null, null, null, null, null, null),
  ('JIPMER UG (Merged into NEET UG)', 'jipmer-ug', 'JIPMER UG', 'other', 'Merged into NEET UG', null, null, null, null, null, null),

  -- Engineering & Technology (National)
  ('JEE Advanced', 'jee-advanced', 'JEE Advanced', 'national', 'IITs (Joint Admission Board)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://jeeadv.ac.in/', 5, null),
  ('BITSAT', 'bitsat', 'BITSAT', 'national', 'BITS Pilani', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://www.bitsadmission.com/', 12, null),
  ('CUET UG', 'cuet-ug', 'CUET UG', 'national', 'NTA (National Testing Agency)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cuet.samarth.ac.in/', 10, null),
  ('GATE', 'gate', 'GATE', 'national', 'IITs/IISc', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://gate2026.iitg.ac.in/', 15, null),
  ('IIT JAM', 'iit-jam', 'IIT JAM', 'national', 'IITs', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://jam2026.iitm.ac.in/', 40, null),

  -- Engineering & Technology (State)
  ('MHT CET', 'mht-cet', 'MHT CET', 'state', 'State CET Cell, Maharashtra', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cetcell.mahacet.org/', 25, null),
  ('WBJEE', 'wbjee', 'WBJEE', 'state', 'WBJEE Board', 'Online application', 'Offline (OMR based)', 'Once a year', 'https://wbjeeb.nic.in/', 32, null),
  ('KCET', 'kcet', 'KCET', 'state', 'KEA (Karnataka Examinations Authority)', 'Online application', 'Offline (OMR based)', 'Once a year', 'https://kea.kar.nic.in/', 33, null),
  ('AP EAMCET', 'ap-eamcet', 'AP EAMCET', 'state', 'JNTU Kakinada (on behalf of APSCHE)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cets.apsche.ap.gov.in/', 34, null),
  ('TS EAMCET', 'ts-eamcet', 'TS EAMCET', 'state', 'JNTU Hyderabad (on behalf of TSCHE)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://eapcet.tsche.ac.in/', 35, null),
  ('KEAM', 'keam', 'KEAM', 'state', 'CEE Kerala', 'Online application', 'Offline (OMR based)', 'Once a year', 'https://cee.kerala.gov.in/', 38, null),
  ('GUJCET', 'gujcet', 'GUJCET', 'state', 'GSEB (Gujarat Secondary and Higher Secondary Education Board)', 'Online application', 'Offline (OMR based)', 'Once a year', 'https://gujcet.gseb.org/', 60, null),
  ('COMEDK UGET', 'comedk-uget', 'COMEDK', 'state', 'COMEDK', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://www.comedk.org/', 28, null),
  ('OJEE', 'ojee', 'OJEE', 'state', 'OJEE Board', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ojee.nic.in/', 58, null),
  ('BCECE', 'bcece', 'BCECE', 'state', 'BCECE Board, Bihar', 'Online application', 'Varies by stream/year', 'Once a year', 'https://bceceboard.bihar.gov.in/', 66, null),

  -- Management / MBA
  ('CAT', 'cat', 'CAT', 'national', 'IIMs', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://iimcat.ac.in/', 6, null),
  ('XAT', 'xat', 'XAT', 'national', 'XLRI', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://xatonline.in/', 14, null),
  ('CMAT', 'cmat', 'CMAT', 'national', 'NTA (National Testing Agency)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cmat.nta.nic.in/', 29, null),
  ('MAT', 'mat', 'MAT', 'national', 'AIMA', 'Online application', 'CBT/PBT (varies)', 'Multiple sessions', 'https://mat.aima.in/', 52, null),
  ('SNAP', 'snap', 'SNAP', 'university', 'Symbiosis International (Deemed University)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://www.snaptest.org/', 31, null),
  ('NMAT', 'nmat', 'NMAT', 'other', 'GMAC', 'Online application', 'Computer Based Test (CBT)', 'Multiple windows', 'https://www.mba.com/exams/nmat', 41, null),
  ('GMAT', 'gmat', 'GMAT', 'other', 'GMAC', 'Online application', 'Computer Based Test (CBT)', 'Multiple windows', 'https://www.mba.com/exams/gmat', null, null),
  ('ATMA', 'atma', 'ATMA', 'national', 'AIMS', 'Online application', 'Computer Based Test (CBT)', 'Multiple sessions', 'https://www.atmaaims.com/', 75, null),
  ('MAH MBA CET', 'mah-mba-cet', 'MAH MBA CET', 'state', 'State CET Cell, Maharashtra', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cetcell.mahacet.org/', 42, null),
  ('TANCET', 'tancet', 'TANCET', 'state', 'Anna University', 'Online application', 'Offline (PBT)', 'Once a year', 'https://www.annauniv.edu/', 65, null),
  ('IBSAT', 'ibsat', 'IBSAT', 'university', 'ICFAI', 'Online application', 'Computer Based Test (CBT)', 'Multiple windows', 'https://www.ibsat.org/', 88, null),

  -- Law
  ('CLAT', 'clat', 'CLAT', 'national', 'Consortium of NLUs', 'Online application', 'Offline (OMR based)', 'Once a year', 'https://consortiumofnlus.ac.in/', 11, null),
  ('AILET', 'ailet', 'AILET', 'national', 'NLU Delhi', 'Online application', 'Offline (OMR based)', 'Once a year', 'https://nludelhi.ac.in/', 36, null),
  ('LSAT India', 'lsat-india', 'LSAT India', 'other', 'LSAC Global', 'Online application', 'Online proctored test', 'Multiple windows', 'https://www.lsatindia.in/', 73, null),
  ('DU LLB Entrance', 'du-llb-entrance', 'DU LLB', 'university', 'University of Delhi', 'Online application', 'Varies by year', 'Once a year', 'https://admission.uod.ac.in/', 77, null),
  ('MH CET Law', 'mh-cet-law', 'MH CET Law', 'state', 'State CET Cell, Maharashtra', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cetcell.mahacet.org/', 63, null),
  ('TS LAWCET', 'ts-lawcet', 'TS LAWCET', 'state', 'Osmania University (on behalf of TSCHE)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://lawcet.tsche.ac.in/', 86, null),
  ('AP LAWCET', 'ap-lawcet', 'AP LAWCET', 'state', 'Sri Krishnadevaraya University (on behalf of APSCHE)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cets.apsche.ap.gov.in/', 87, null),

  -- Design / Architecture
  ('NIFT Entrance Exam', 'nift-entrance-exam', 'NIFT', 'national', 'NIFT', 'Online application', 'Offline/Written + Situation Test (varies)', 'Once a year', 'https://nift.ac.in/', 44, null),
  ('NID DAT', 'nid-dat', 'NID DAT', 'national', 'NID', 'Online application', 'Written + Studio/Interview (varies)', 'Once a year', 'https://admissions.nid.edu/', 47, null),
  ('UCEED', 'uceed', 'UCEED', 'national', 'IIT Bombay', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://uceed.iitb.ac.in/', 48, null),
  ('CEED', 'ceed', 'CEED', 'national', 'IIT Bombay', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ceed.iitb.ac.in/', 54, null),
  ('AAT (Architecture Aptitude Test)', 'aat', 'AAT', 'national', 'IITs (via JEE Advanced)', 'Online application', 'Offline (Drawing)', 'Once a year', 'https://jeeadv.ac.in/', 93, null),
  ('JEE Main (B.Arch)', 'jee-main-b-arch', 'JEE Main B.Arch', 'national', 'NTA (National Testing Agency)', 'Online application', 'Computer Based Test (CBT) + Drawing (varies)', 'Multiple sessions (typically 2 per year)', 'https://jeemain.nta.nic.in/', 49, null),
  ('NATA', 'nata', 'NATA', 'national', 'Council of Architecture', 'Online application', 'Computer Based Test (CBT)', 'Multiple windows', 'https://nata.in/', 57, null),

  -- Teaching / Education
  ('CTET', 'ctet', 'CTET', 'national', 'CBSE', 'Online application', 'Offline (OMR based)', 'Twice a year (typically)', 'https://ctet.nic.in/', 16, null),
  ('UGC NET', 'ugc-net', 'UGC NET', 'national', 'NTA (National Testing Agency)', 'Online application', 'Computer Based Test (CBT)', 'Twice a year (typically)', 'https://ugcnet.nta.nic.in/', 27, null),
  ('CSIR NET', 'csir-net', 'CSIR NET', 'national', 'NTA / CSIR', 'Online application', 'Computer Based Test (CBT)', 'Twice a year (typically)', 'https://csirnet.nta.nic.in/', 43, null),
  ('DSSSB', 'dsssb', 'DSSSB', 'state', 'Delhi Subordinate Services Selection Board', 'Online application', 'Computer Based Test (CBT)', 'Multiple cycles', 'https://dsssb.delhi.gov.in/', 81, null),
  ('KVS Recruitment Exams', 'kvs-recruitment-exams', 'KVS', 'national', 'Kendriya Vidyalaya Sangathan', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://kvsangathan.nic.in/', 83, null),
  ('NVS Recruitment Exams', 'nvs-recruitment-exams', 'NVS', 'national', 'Navodaya Vidyalaya Samiti', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://navodaya.gov.in/', 84, null),
  ('UPTET', 'uptet', 'UPTET', 'state', 'UP Basic Education Board', 'Online application', 'Offline (OMR based)', 'As notified', null, 95, null),
  ('HTET', 'htet', 'HTET', 'state', 'Board of School Education Haryana', 'Online application', 'Offline (OMR based)', 'As notified', null, 96, null),
  ('REET', 'reet', 'REET', 'state', 'Board of Secondary Education, Rajasthan', 'Online application', 'Offline (OMR based)', 'As notified', null, 94, null),

  -- Civil Services & UPSC (Other)
  ('UPSC CDS', 'upsc-cds', 'CDS', 'national', 'UPSC (Union Public Service Commission)', 'Online application', 'Offline (Written) + Interview', 'Twice a year (typically)', 'https://www.upsc.gov.in/', 24, null),
  ('UPSC NDA', 'upsc-nda', 'NDA', 'national', 'UPSC (Union Public Service Commission)', 'Online application', 'Offline (Written) + SSB Interview', 'Twice a year (typically)', 'https://www.upsc.gov.in/', 20, null),
  ('UPSC CAPF', 'upsc-capf', 'CAPF', 'national', 'UPSC (Union Public Service Commission)', 'Online application', 'Offline (Written) + Interview', 'Once a year', 'https://www.upsc.gov.in/', 53, null),
  ('UPSC IES', 'upsc-ies', 'IES/ESE', 'national', 'UPSC (Union Public Service Commission)', 'Online application', 'Offline (Written) + Interview', 'Once a year', 'https://www.upsc.gov.in/', 59, null),
  ('UPSC CMS', 'upsc-cms', 'CMS', 'national', 'UPSC (Union Public Service Commission)', 'Online application', 'Offline (Written) + Interview', 'Once a year', 'https://www.upsc.gov.in/', 62, null),
  ('UPSC EPFO', 'upsc-epfo', 'EPFO', 'national', 'UPSC (Union Public Service Commission)', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://www.upsc.gov.in/', 69, null),

  -- SSC
  ('SSC CGL', 'ssc-cgl', 'SSC CGL', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ssc.gov.in/', 19, null),
  ('SSC CHSL', 'ssc-chsl', 'SSC CHSL', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ssc.gov.in/', 26, null),
  ('SSC MTS', 'ssc-mts', 'SSC MTS', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ssc.gov.in/', 45, null),
  ('SSC GD', 'ssc-gd', 'SSC GD', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ssc.gov.in/', 23, null),
  ('SSC JE', 'ssc-je', 'SSC JE', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ssc.gov.in/', 56, null),
  ('SSC Stenographer', 'ssc-stenographer', 'SSC Steno', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT) + Skill Test', 'Once a year', 'https://ssc.gov.in/', 67, null),
  ('SSC Selection Post', 'ssc-selection-post', 'SSC Selection Post', 'national', 'SSC (Staff Selection Commission)', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://ssc.gov.in/', 72, null),

  -- Banking
  ('SBI PO', 'sbi-po', 'SBI PO', 'national', 'SBI', 'Online application', 'Online (Prelims + Mains) + Interview', 'Once a year', 'https://sbi.co.in/web/careers', 13, null),
  ('SBI Clerk', 'sbi-clerk', 'SBI Clerk', 'national', 'SBI', 'Online application', 'Online (Prelims + Mains)', 'Once a year', 'https://sbi.co.in/web/careers', 30, null),
  ('IBPS PO', 'ibps-po', 'IBPS PO', 'national', 'IBPS', 'Online application', 'Online (Prelims + Mains) + Interview', 'Once a year', 'https://www.ibps.in/', 17, null),
  ('IBPS Clerk', 'ibps-clerk', 'IBPS Clerk', 'national', 'IBPS', 'Online application', 'Online (Prelims + Mains)', 'Once a year', 'https://www.ibps.in/', 37, null),
  ('IBPS SO', 'ibps-so', 'IBPS SO', 'national', 'IBPS', 'Online application', 'Online (Prelims + Mains) + Interview', 'Once a year', 'https://www.ibps.in/', 64, null),
  ('RRB PO', 'rrb-po', 'RRB PO', 'national', 'IBPS (RRB)', 'Online application', 'Online (Prelims + Mains) + Interview', 'Once a year', 'https://www.ibps.in/', 51, null),
  ('RRB Clerk', 'rrb-clerk', 'RRB Clerk', 'national', 'IBPS (RRB)', 'Online application', 'Online (Prelims + Mains)', 'Once a year', 'https://www.ibps.in/', 50, null),

  -- Insurance
  ('LIC AAO', 'lic-aao', 'LIC AAO', 'national', 'LIC', 'Online application', 'Online (Prelims + Mains) + Interview', 'As notified', 'https://licindia.in/', 80, null),
  ('LIC ADO', 'lic-ado', 'LIC ADO', 'national', 'LIC', 'Online application', 'Online (Prelims + Mains) + Interview', 'As notified', 'https://licindia.in/', 90, null),
  ('NIACL AO', 'niacl-ao', 'NIACL AO', 'national', 'New India Assurance', 'Online application', 'Online (Prelims + Mains) + Interview', 'As notified', 'https://www.newindia.co.in/', 89, null),
  ('UIIC AO', 'uiic-ao', 'UIIC AO', 'national', 'UIIC', 'Online application', 'Online (Prelims + Mains) + Interview', 'As notified', 'https://uiic.co.in/', 91, null),

  -- Defence & Paramilitary
  ('AFCAT', 'afcat', 'AFCAT', 'national', 'Indian Air Force', 'Online application', 'Computer Based Test (CBT) + AFSB', 'Twice a year (typically)', 'https://afcat.cdac.in/', 39, null),
  ('INET', 'inet', 'INET', 'national', 'Indian Navy', 'Online application', 'Computer Based Test (CBT) + SSB', 'As notified', 'https://www.joinindiannavy.gov.in/', 71, null),
  ('Territorial Army', 'territorial-army', 'TA', 'national', 'Indian Army', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://territorialarmy.in/', 97, null),
  ('Indian Army Agniveer', 'indian-army-agniveer', 'Agniveer Army', 'national', 'Indian Army', 'Online application', 'As notified', 'As notified', 'https://joinindianarmy.nic.in/', 74, null),
  ('Indian Navy Agniveer', 'indian-navy-agniveer', 'Agniveer Navy', 'national', 'Indian Navy', 'Online application', 'As notified', 'As notified', 'https://www.joinindiannavy.gov.in/', 79, null),
  ('Indian Air Force Agniveer', 'indian-air-force-agniveer', 'Agniveer IAF', 'national', 'Indian Air Force', 'Online application', 'As notified', 'As notified', 'https://agnipathvayu.cdac.in/', 78, null),
  ('Coast Guard Exams', 'coast-guard-exams', 'ICG', 'national', 'Indian Coast Guard', 'Online application', 'As notified', 'As notified', 'https://joinindiancoastguard.gov.in/', 85, null),
  ('CRPF Exams', 'crpf-exams', 'CRPF', 'national', 'CRPF', 'Online application', 'As notified', 'As notified', 'https://crpf.gov.in/', null, null),
  ('BSF Exams', 'bsf-exams', 'BSF', 'national', 'BSF', 'Online application', 'As notified', 'As notified', 'https://bsf.gov.in/', null, null),

  -- Science & Research
  ('ICMR JRF', 'icmr-jrf', 'ICMR JRF', 'national', 'ICMR', 'Online application', 'Written exam + interview (varies)', 'Once a year', 'https://www.icmr.gov.in/', 99, null),
  ('DBT BET', 'dbt-bet', 'DBT BET', 'national', 'DBT', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://dbtindia.gov.in/', null, null),
  ('TIFR GS', 'tifr-gs', 'TIFR GS', 'national', 'TIFR', 'Online application', 'Written + interview', 'Once a year', 'https://www.tifr.res.in/', null, null),
  ('JEST', 'jest', 'JEST', 'national', 'JEST (Consortium)', 'Online application', 'Offline/CBT (varies)', 'Once a year', 'https://www.jest.org.in/', null, null),

  -- Arts, Commerce & General Degree
  ('CUET PG', 'cuet-pg', 'CUET PG', 'national', 'NTA (National Testing Agency)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://cuet.nta.nic.in/', 46, null),
  ('DU JAT', 'du-jat', 'DU JAT', 'university', 'University of Delhi', 'Online application', 'Varies by year', 'Once a year', 'https://admission.uod.ac.in/', 100, null),
  ('IPU CET', 'ipu-cet', 'IPU CET', 'university', 'GGSIPU', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://ipu.admissions.nic.in/', 82, null),
  ('Christ University Entrance', 'christ-university-entrance', 'Christ', 'university', 'Christ (Deemed to be University)', 'Online application', 'Varies', 'Varies', 'https://christuniversity.in/', null, null),
  ('Symbiosis SET', 'symbiosis-set', 'SET', 'university', 'Symbiosis International (Deemed University)', 'Online application', 'Computer Based Test (CBT)', 'Once a year', 'https://www.set-test.org/', null, null),
  ('AMU Entrance Exam', 'amu-entrance-exam', 'AMU', 'university', 'Aligarh Muslim University', 'Online application', 'Varies', 'Once a year', 'https://www.amucontrollerexams.com/', null, null),
  ('JMI Entrance Exam', 'jmi-entrance-exam', 'JMI', 'university', 'Jamia Millia Islamia', 'Online application', 'Varies', 'Once a year', 'https://jmicoe.in/', null, null),

  -- Polytechnic / ITI / Skill
  ('ITI Entrance Exams', 'iti-entrance-exams', 'ITI', 'other', null, 'Online application', 'Varies by state/institute', 'Varies', null, null, null),
  ('Polytechnic Entrance Exams', 'polytechnic-entrance-exams', 'Polytechnic', 'other', null, 'Online application', 'Varies by state/institute', 'Varies', null, null, null),
  ('Skill India Certification Exams', 'skill-india-certification-exams', 'Skill India', 'other', 'Skill India / NSDC (varies)', 'Online', 'Varies', 'Varies', 'https://www.skillindia.gov.in/', null, null),
  ('Apprenticeship Exams', 'apprenticeship-exams', 'Apprenticeship', 'other', 'NATS/NAPS (varies)', 'Online', 'Varies', 'Varies', null, null, null),

  -- Study Abroad / Language
  ('IELTS', 'ielts', 'IELTS', 'other', 'IELTS (British Council/IDP)', 'Online/Offline registration', 'Computer/ Paper-based (varies)', 'Multiple dates', 'https://www.ielts.org/', null, null),
  ('TOEFL', 'toefl', 'TOEFL', 'other', 'ETS', 'Online registration', 'Internet-based test (iBT)', 'Multiple dates', 'https://www.ets.org/toefl', null, null),
  ('PTE', 'pte', 'PTE', 'other', 'Pearson', 'Online registration', 'Computer-based', 'Multiple dates', 'https://www.pearsonpte.com/', null, null),
  ('GRE', 'gre', 'GRE', 'other', 'ETS', 'Online registration', 'Computer-based', 'Multiple dates', 'https://www.ets.org/gre', null, null),
  ('SAT', 'sat', 'SAT', 'other', 'College Board', 'Online registration', 'Digital/Computer-based', 'Multiple dates', 'https://satsuite.collegeboard.org/sat', null, null),
  ('ACT', 'act', 'ACT', 'other', 'ACT', 'Online registration', 'Computer/Paper (varies)', 'Multiple dates', 'https://www.act.org/', null, null),

  -- State Government (Examples)
  ('UPPSC', 'uppsc', 'UPPSC', 'state', 'Uttar Pradesh Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://uppsc.up.nic.in/', 76, null),
  ('BPSC', 'bpsc', 'BPSC', 'state', 'Bihar Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://www.bpsc.bih.nic.in/', null, null),
  ('MPPSC', 'mppsc', 'MPPSC', 'state', 'Madhya Pradesh Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://mppsc.mp.gov.in/', null, null),
  ('RPSC', 'rpsc', 'RPSC', 'state', 'Rajasthan Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://rpsc.rajasthan.gov.in/', null, null),
  ('TNPSC', 'tnpsc', 'TNPSC', 'state', 'Tamil Nadu Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://www.tnpsc.gov.in/', null, null),
  ('KPSC', 'kpsc', 'KPSC', 'state', 'Karnataka Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://kpsc.kar.nic.in/', null, null),
  ('APPSC', 'appsc', 'APPSC', 'state', 'Andhra Pradesh Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://psc.ap.gov.in/', null, null),
  ('TSPSC', 'tspsc', 'TSPSC', 'state', 'Telangana State Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://www.tspsc.gov.in/', null, null),
  ('WBPSC', 'wbpsc', 'WBPSC', 'state', 'West Bengal Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://wbpsc.gov.in/', null, null),
  ('MPSC', 'mpsc', 'MPSC', 'state', 'Maharashtra Public Service Commission', 'Online application', 'Offline/CBT (as notified)', 'As notified', 'https://mpsc.gov.in/', null, null),

  -- Other Government & PSU
  ('RRB NTPC', 'rrb-ntpc', 'RRB NTPC', 'national', 'RRBs (Railway Recruitment Boards)', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://www.rrbcdg.gov.in/', 21, null),
  ('RRB Group D', 'rrb-group-d', 'RRB Group D', 'national', 'RRBs (Railway Recruitment Boards)', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://www.rrbcdg.gov.in/', 28, null),
  ('ISRO Exams', 'isro-exams', 'ISRO', 'national', 'ISRO', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://www.isro.gov.in/careers', null, null),
  ('DRDO Exams', 'drdo-exams', 'DRDO', 'national', 'DRDO', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://www.drdo.gov.in/careers', null, null),
  ('BARC Exams', 'barc-exams', 'BARC', 'national', 'BARC', 'Online application', 'Computer Based Test (CBT)', 'As notified', 'https://www.barc.gov.in/careers/', null, null),
  ('ONGC Exams', 'ongc-exams', 'ONGC', 'national', 'ONGC', 'Online application', 'As notified', 'As notified', 'https://ongcindia.com/', null, null),
  ('NTPC Exams', 'ntpc-exams', 'NTPC', 'national', 'NTPC', 'Online application', 'As notified', 'As notified', 'https://careers.ntpc.co.in/', null, null),
  ('IOCL Exams', 'iocl-exams', 'IOCL', 'national', 'IOCL', 'Online application', 'As notified', 'As notified', 'https://iocl.com/People-Careers', null, null),
  ('AAI Exams', 'aai-exams', 'AAI', 'national', 'Airports Authority of India', 'Online application', 'As notified', 'As notified', 'https://www.aai.aero/en/careers', null, null)
on conflict (slug) do nothing;

-- Map exams to domains (bulk)
insert into public.exam_domains (exam_id, domain_id)
select e.id, d.id
from (
  values
    -- Medical
    ('neet-ug', 'medical'),
    ('neet-pg', 'medical'),
    ('ini-cet', 'medical'),
    ('fmge', 'medical'),
    ('dnb-pdcet', 'medical'),
    ('bsc-nursing-entrance', 'medical'),
    ('paramedical-entrance-exams', 'medical'),
    ('aiims-ug', 'medical'),
    ('jipmer-ug', 'medical'),

    -- Engineering
    ('jee-main', 'engineering'),
    ('jee-advanced', 'engineering'),
    ('bitsat', 'engineering'),
    ('gate', 'engineering'),
    ('iit-jam', 'engineering'),
    ('mht-cet', 'engineering'),
    ('wbjee', 'engineering'),
    ('kcet', 'engineering'),
    ('ap-eamcet', 'engineering'),
    ('ts-eamcet', 'engineering'),
    ('keam', 'engineering'),
    ('gujcet', 'engineering'),
    ('comedk-uget', 'engineering'),
    ('ojee', 'engineering'),
    ('bcece', 'engineering'),
    ('jee-main-b-arch', 'engineering'),

    -- Science
    ('gate', 'science'),
    ('iit-jam', 'science'),
    ('csir-net', 'science'),
    ('icmr-jrf', 'science'),
    ('dbt-bet', 'science'),
    ('tifr-gs', 'science'),
    ('jest', 'science'),

    -- Management
    ('cat', 'management'),
    ('xat', 'management'),
    ('cmat', 'management'),
    ('mat', 'management'),
    ('snap', 'management'),
    ('nmat', 'management'),
    ('gmat', 'management'),
    ('atma', 'management'),
    ('mah-mba-cet', 'management'),
    ('tancet', 'management'),
    ('ibsat', 'management'),

    -- Law
    ('clat', 'law'),
    ('ailet', 'law'),
    ('lsat-india', 'law'),
    ('du-llb-entrance', 'law'),
    ('mh-cet-law', 'law'),
    ('ts-lawcet', 'law'),
    ('ap-lawcet', 'law'),

    -- Design
    ('nift-entrance-exam', 'design'),
    ('nid-dat', 'design'),
    ('uceed', 'design'),
    ('ceed', 'design'),
    ('aat', 'design'),
    ('nata', 'design'),
    ('jee-main-b-arch', 'design'),

    -- Teaching
    ('ctet', 'teaching'),
    ('ugc-net', 'teaching'),
    ('csir-net', 'teaching'),
    ('dsssb', 'teaching'),
    ('kvs-recruitment-exams', 'teaching'),
    ('nvs-recruitment-exams', 'teaching'),
    ('uptet', 'teaching'),
    ('htet', 'teaching'),
    ('reet', 'teaching'),

    -- Government/UPSC
    ('upsc-cse', 'government'),
    ('upsc-cds', 'government'),
    ('upsc-nda', 'government'),
    ('upsc-capf', 'government'),
    ('upsc-ies', 'government'),
    ('upsc-cms', 'government'),
    ('upsc-epfo', 'government'),

    -- SSC
    ('ssc-cgl', 'ssc'),
    ('ssc-chsl', 'ssc'),
    ('ssc-mts', 'ssc'),
    ('ssc-gd', 'ssc'),
    ('ssc-je', 'ssc'),
    ('ssc-stenographer', 'ssc'),
    ('ssc-selection-post', 'ssc'),

    -- Banking
    ('sbi-po', 'banking'),
    ('sbi-clerk', 'banking'),
    ('ibps-po', 'banking'),
    ('ibps-clerk', 'banking'),
    ('ibps-so', 'banking'),
    ('rrb-po', 'banking'),
    ('rrb-clerk', 'banking'),

    -- Insurance
    ('lic-aao', 'insurance'),
    ('lic-ado', 'insurance'),
    ('niacl-ao', 'insurance'),
    ('uiic-ao', 'insurance'),

    -- Defence
    ('upsc-nda', 'defence'),
    ('upsc-cds', 'defence'),
    ('afcat', 'defence'),
    ('inet', 'defence'),
    ('territorial-army', 'defence'),
    ('indian-army-agniveer', 'defence'),
    ('indian-navy-agniveer', 'defence'),
    ('indian-air-force-agniveer', 'defence'),
    ('coast-guard-exams', 'defence'),
    ('crpf-exams', 'defence'),
    ('bsf-exams', 'defence'),

    -- Arts/Commerce/General
    ('cuet-ug', 'arts-commerce'),
    ('cuet-pg', 'arts-commerce'),
    ('du-jat', 'arts-commerce'),
    ('ipu-cet', 'arts-commerce'),
    ('christ-university-entrance', 'arts-commerce'),
    ('symbiosis-set', 'arts-commerce'),
    ('amu-entrance-exam', 'arts-commerce'),
    ('jmi-entrance-exam', 'arts-commerce'),

    -- CUET also used for engineering pathways
    ('cuet-ug', 'engineering'),

    -- Skill
    ('iti-entrance-exams', 'skill'),
    ('polytechnic-entrance-exams', 'skill'),
    ('skill-india-certification-exams', 'skill'),
    ('apprenticeship-exams', 'skill'),

    -- Study Abroad
    ('ielts', 'study-abroad'),
    ('toefl', 'study-abroad'),
    ('pte', 'study-abroad'),
    ('gre', 'study-abroad'),
    ('sat', 'study-abroad'),
    ('act', 'study-abroad'),

    -- State Government
    ('uppsc', 'state-government'),
    ('bpsc', 'state-government'),
    ('mppsc', 'state-government'),
    ('rpsc', 'state-government'),
    ('tnpsc', 'state-government'),
    ('kpsc', 'state-government'),
    ('appsc', 'state-government'),
    ('tspsc', 'state-government'),
    ('wbpsc', 'state-government'),
    ('mpsc', 'state-government'),

    -- PSU & Other Government
    ('rrb-ntpc', 'psu'),
    ('rrb-group-d', 'psu'),
    ('isro-exams', 'psu'),
    ('drdo-exams', 'psu'),
    ('barc-exams', 'psu'),
    ('ongc-exams', 'psu'),
    ('ntpc-exams', 'psu'),
    ('iocl-exams', 'psu'),
    ('aai-exams', 'psu')
) v(exam_slug, domain_slug)
join public.exams e on e.slug = v.exam_slug
join public.domains d on d.slug = v.domain_slug
on conflict do nothing;

-- Map exams to domains
insert into public.exam_domains (exam_id, domain_id)
select e.id, d.id
from public.exams e
join public.domains d on d.slug = 'engineering'
where e.slug = 'jee-main'
on conflict do nothing;

insert into public.exam_domains (exam_id, domain_id)
select e.id, d.id
from public.exams e
join public.domains d on d.slug = 'medical'
where e.slug = 'neet-ug'
on conflict do nothing;

insert into public.exam_domains (exam_id, domain_id)
select e.id, d.id
from public.exams e
join public.domains d on d.slug = 'government'
where e.slug = 'upsc-cse'
on conflict do nothing;

-- Section registry (optional completeness tracker)
insert into public.exam_sections (exam_id, section_key, status)
select e.id, s.section_key, 'published'
from public.exams e
cross join (values
  ('overview'),
  ('eligibility'),
  ('syllabus'),
  ('exam-pattern'),
  ('how-to-prepare'),
  ('previous-year-question-papers')
) s(section_key)
where e.slug in ('jee-main','neet-ug','upsc-cse')
on conflict do nothing;

-- -------------------------
-- JEE Main content
-- -------------------------
insert into public.exam_overview (exam_id, content_markdown)
select e.id, $$
## What is JEE Main?

JEE Main is a national-level engineering entrance exam used for admission to undergraduate engineering and architecture/planning programs. It is also a qualifying route for JEE Advanced for eligible candidates.

## Key things aspirants should know

- JEE Main can have multiple sessions in a year. You can attempt more than one session (as permitted by the notification).
- The exam may have different papers depending on the course (for example, B.E./B.Tech vs. B.Arch/B.Plan).
- Your preparation should be syllabus-driven and PYQ-verified.

## Recommended preparation workflow

1. Convert the syllabus into a topic checklist.
2. Study concepts + solve mixed difficulty questions.
3. Practice PYQs topic-wise first, then full-length mocks.
4. Maintain an error log (concept gap, calculation error, time management, guessing).

## Official reference

Always verify dates, eligibility, and paper structure from the official portal and the latest information bulletin.
$$
from public.exams e where e.slug = 'jee-main'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.eligibility (exam_id, content_markdown)
select e.id, $$
## JEE Main eligibility (how to read it correctly)

Eligibility rules can vary by year and by the paper you apply for. Use the latest information bulletin as the source of truth.

## Common eligibility checkpoints

### Educational qualification

- Candidates should have passed (or be appearing in) Class 12 or an equivalent examination.
- Subject requirements can differ by paper. Verify the subject combination for the course you are targeting.

### Attempts and year of passing

- There may be limits based on number of attempts and/or year of passing.
- If you are taking multiple sessions, confirm how best score is computed (session-wise) as per rules.

### Nationality and category rules

- Reservation and category benefits require valid certificates in the prescribed format.

## Practical advice

Before paying the application fee, check:

- Course/paper eligibility
- Category certificate requirements
- Whether you are eligible for JEE Advanced via JEE Main (if that is your goal)
$$
from public.exams e where e.slug = 'jee-main'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.syllabus (exam_id, content_markdown)
select e.id, $$
## JEE Main syllabus overview

JEE Main preparation is most effective when you study strictly from the official syllabus and validate priorities using PYQs.

## Subject-wise approach

### Physics

- Focus on concepts + formula application.
- Practice numerical problems under time constraints.

### Chemistry

- Build a balanced plan for Physical, Organic, and Inorganic Chemistry.
- Revise NCERT thoroughly where relevant.

### Mathematics

- Prioritise problem-solving speed and accuracy.
- Maintain a formula sheet and revise it frequently.

## How to use PYQs with the syllabus

1. Pick a topic.
2. Solve last 5–10 years PYQs from that topic.
3. Mark recurring sub-topics and typical traps.
4. Revisit weak concepts and repeat.
$$
from public.exams e where e.slug = 'jee-main'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.pattern (exam_id, content_markdown)
select e.id, $$
## JEE Main exam pattern (what matters for score)

The exam pattern may have multiple papers and section formats. Always confirm the latest paper structure from the official bulletin.

## What to check in the latest notification

- Paper(s) you are applying for (B.E./B.Tech, B.Arch, B.Plan)
- Section-wise questions and marking scheme
- Duration and total marks
- Type of questions (MCQ / numerical value answers)

## Strategy based on pattern

### Attempt order

- Start with your strongest section to build momentum.
- Avoid spending more than a fixed time per question in the first pass.

### Accuracy-first rule

If negative marking applies, your net score improves more by increasing accuracy than by random attempts.

## Mock tests

Attempt full-length mocks in exam-like conditions and analyze:

- time per section
- question selection
- silly mistakes vs concept gaps
$$
from public.exams e where e.slug = 'jee-main'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.preparation (exam_id, content_markdown)
select e.id, $$
## How to prepare for JEE Main

A realistic JEE Main plan is a combination of concept clarity, disciplined practice, and repeated analysis.

## 12-week structure (adapt as per your timeline)

### Weeks 1–6: Coverage + daily practice

- Cover syllabus topics with a daily practice target.
- Do short quizzes after every topic.

### Weeks 7–10: PYQ-first + mixed sets

- Use PYQs to identify high-weightage concepts.
- Solve mixed topic sets to build switching ability.

### Weeks 11–12: Full mocks + revision

- Attempt mocks, then analyze for weaknesses.
- Revise formulas and your error log daily.

## Resources discipline

Keep resources limited:

- one theory source per subject
- one primary problem book/source
- PYQ compilation
- mock test platform
$$
from public.exams e where e.slug = 'jee-main'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.pyq (exam_id, content_markdown)
select e.id, $$
## JEE Main previous year question papers (PYQs)

PYQs are essential for understanding difficulty level and recurring patterns.

## Best way to practice PYQs

### Phase 1: Topic-wise

- Solve topic-wise PYQs right after finishing a topic.
- Note repeated concepts and question styles.

### Phase 2: Year-wise

- Attempt full papers with timer.
- Simulate CBT conditions as much as possible.

### Phase 3: Error log loop

- Record mistakes with the reason.
- Revise the related concept and redo similar questions.

## What to avoid

- Solving PYQs without analysis
- Ignoring incorrect attempts
- Skipping revision of weak topics
$$
from public.exams e where e.slug = 'jee-main'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

-- JEE Main FAQs (overview + a couple section FAQs)
insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'overview', 'Is JEE Main the same as JEE Advanced?',
'No. JEE Main is a separate exam and is also used as a qualifying route for JEE Advanced based on the rules of the year. JEE Advanced has its own eligibility and separate paper.', 1
from public.exams e where e.slug = 'jee-main'
on conflict do nothing;

insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'eligibility', 'Can a Class 12 appearing student apply for JEE Main?',
'Generally, yes. Candidates appearing in Class 12 (or equivalent) are usually allowed. Always verify the latest notification for exact conditions.', 1
from public.exams e where e.slug = 'jee-main'
on conflict do nothing;

insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'previous-year-question-papers', 'How many years of JEE Main PYQs should I practice?',
'As a practical baseline, aim for at least 5–10 years. Start topic-wise, then move to full papers under time conditions.', 1
from public.exams e where e.slug = 'jee-main'
on conflict do nothing;

-- -------------------------
-- NEET UG content
-- -------------------------
insert into public.exam_overview (exam_id, content_markdown)
select e.id, $$
## What is NEET UG?

NEET UG is the national-level medical entrance exam for undergraduate medical education pathways in India. It is used for admissions to MBBS/BDS and allied programs as notified.

## What matters for NEET preparation

- Biology is a high-impact area; focus on NCERT alignment and repeated revision.
- Chemistry requires a balance of theory recall and numerical practice.
- Physics needs concept clarity and speed under time pressure.

## Preparation workflow

1. Syllabus checklist → daily targets.
2. NCERT-first for Biology and Inorganic Chemistry (where applicable).
3. PYQs + chapter-wise tests.
4. Full mocks + deep analysis.

## Official reference

Dates, pattern, and admission rules should be verified from the official NEET portal and latest information bulletin.
$$
from public.exams e where e.slug = 'neet-ug'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.eligibility (exam_id, content_markdown)
select e.id, $$
## NEET UG eligibility (high-signal checklist)

Eligibility rules are notification-driven. Use this checklist to verify your status, then confirm the final conditions from the official bulletin.

## Core checks

### Qualification

- Passed/appearing in Class 12 (or equivalent) with required subjects.

### Age and attempts

- Minimum age and other conditions are as per the official notification.

### Nationality and category

- Rules can differ for Indian nationals, NRIs, OCI and other categories.
- Reservation benefits require valid certificates.

## Practical advice

Before applying, confirm:

- the exact subject requirements
- category certificate formats
- eligibility for the quota/counselling route you are targeting
$$
from public.exams e where e.slug = 'neet-ug'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.syllabus (exam_id, content_markdown)
select e.id, $$
## NEET UG syllabus overview

NEET UG preparation becomes significantly easier when you convert the syllabus into a checklist and revise it in cycles.

## Subject-wise priorities

### Biology

- Read NCERT line-by-line.
- Revise diagrams, examples, and key definitions.

### Chemistry

- Physical: practice numericals and formulas.
- Organic: reactions + mechanisms + practice.
- Inorganic: NCERT recall + periodic trends.

### Physics

- Concept clarity first, then speed.
- Practice mixed questions after each chapter.

## PYQ-driven focus

Use NEET PYQs to identify recurring patterns (especially in Biology and Chemistry) and revise those parts more frequently.
$$
from public.exams e where e.slug = 'neet-ug'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.pattern (exam_id, content_markdown)
select e.id, $$
## NEET UG exam pattern (what to track)

The exam is typically conducted in an offline (OMR) format with multiple subjects.

## What to confirm from the latest bulletin

- total questions and marking scheme
- subject-wise distribution
- duration and reporting requirements

## Strategy based on pattern

- Start with Biology to secure quick marks if it is your strongest area.
- Keep an accuracy-first approach where negative marking applies.
- Use a strict time plan and avoid getting stuck on one question.

## OMR practice

Do a few full mocks in OMR style to reduce bubbling and time-management errors.
$$
from public.exams e where e.slug = 'neet-ug'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.preparation (exam_id, content_markdown)
select e.id, $$
## How to prepare for NEET UG

NEET requires consistency and repeated revision more than anything else.

## 10-week actionable plan

### Weeks 1–4: Coverage + daily tests

- Complete topic blocks with daily MCQ practice.
- Revise Biology frequently using NCERT.

### Weeks 5–8: PYQ + chapter tests

- Solve PYQs topic-wise.
- Take chapter-wise tests and maintain an error log.

### Weeks 9–10: Full mocks + revision

- Do full-length mocks.
- Analyze performance and revise weak areas.

## Revision rule

If a topic is important, revise it multiple times. Plan revision cycles (weekly/bi-weekly) rather than one-time reading.
$$
from public.exams e where e.slug = 'neet-ug'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.pyq (exam_id, content_markdown)
select e.id, $$
## NEET UG previous year question papers (PYQs)

NEET PYQs help you understand the style of Biology statements, Chemistry recall, and Physics numerical patterns.

## How to use PYQs efficiently

### Topic-wise (recommended first)

- Solve PYQs after completing a chapter.
- Tag questions as: direct recall / concept application / tricky.

### Full papers

- Attempt full papers under timed conditions.
- Review mistakes and mark weak concepts.

## What to track

- Accuracy percentage per subject
- Time per question
- Topics with recurring mistakes
$$
from public.exams e where e.slug = 'neet-ug'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'overview', 'Is NCERT enough for NEET UG?',
'NCERT is the foundation (especially for Biology and parts of Chemistry). However, for a competitive score, you should add MCQ practice, PYQs, and mocks with analysis.', 1
from public.exams e where e.slug = 'neet-ug'
on conflict do nothing;

insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'how-to-prepare', 'How many mock tests should I take for NEET?',
'Quality matters more than count. Take mocks regularly and analyze them deeply. A consistent cycle of attempt → analysis → targeted revision is the most effective.', 1
from public.exams e where e.slug = 'neet-ug'
on conflict do nothing;

-- -------------------------
-- UPSC CSE content
-- -------------------------
insert into public.exam_overview (exam_id, content_markdown)
select e.id, $$
## What is UPSC CSE?

UPSC Civil Services Examination (CSE) is India’s premier recruitment exam for services like IAS, IPS, IFS and other central services.

## Exam stages (high level)

- Preliminary Examination (objective)
- Main Examination (written descriptive)
- Personality Test (interview)

## What successful preparation looks like

1. Read the syllabus as a document and convert it into a list of micro-topics.
2. Build daily answer-writing practice for Mains.
3. Maintain current affairs notes and revise them.
4. Use PYQs to understand how UPSC frames questions.

## Official reference

Always use UPSC notification and syllabus PDF as the final authority.
$$
from public.exams e where e.slug = 'upsc-cse'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.eligibility (exam_id, content_markdown)
select e.id, $$
## UPSC CSE eligibility (what to verify)

Eligibility is strictly notification-driven. Check the latest notification for exact conditions.

## Core checks

### Age limit

- Minimum and maximum age limits with category-wise relaxations.

### Educational qualification

- Graduation in any discipline from a recognized university (as per rules).

### Attempts

- Attempt limits can apply and can be category-specific.

### Nationality

- Nationality requirements depend on the service/category.

## Practical advice

Before filling the form, ensure your documents match the required formats, especially for category and disability certificates (if applicable).
$$
from public.exams e where e.slug = 'upsc-cse'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.syllabus (exam_id, content_markdown)
select e.id, $$
## UPSC CSE syllabus (how to treat it)

The UPSC syllabus is not a list to read once — it is a map for your entire preparation.

## Prelims vs Mains

### Prelims

- General Studies (GS)
- CSAT (qualifying as per rules)

### Mains

- Essay
- GS Papers
- Optional subject papers

## Syllabus-to-plan method

1. Break each syllabus line into micro-topics.
2. Create sources for each micro-topic (limited and standard).
3. Practice answer writing for Mains from day 1 (small, consistent).
4. Use PYQs to see what UPSC actually asks.
$$
from public.exams e where e.slug = 'upsc-cse'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.pattern (exam_id, content_markdown)
select e.id, $$
## UPSC CSE exam pattern (decision-critical points)

UPSC CSE has multiple stages and the strategy must match the stage.

## What to confirm from the notification

- Stage-wise papers
- Qualifying nature of CSAT and language papers (as applicable)
- Negative marking rules in Prelims
- Optional subject structure

## Strategy implications

- Prelims: accuracy + breadth, with revision.
- Mains: depth + answer writing + structure.
- Interview: personality-based discussion and clarity of thought.
$$
from public.exams e where e.slug = 'upsc-cse'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.preparation (exam_id, content_markdown)
select e.id, $$
## How to prepare for UPSC CSE

UPSC requires long-term discipline, limited sources, and continuous practice.

## 3-phase strategy

### Phase 1: Foundation (sources + notes)

- Read standard books and make short notes.
- Build basic current affairs notes.

### Phase 2: Practice (PYQs + tests)

- Solve PYQs for Prelims and Mains.
- Join a test series only when your basics are ready.

### Phase 3: Revision + writing

- Revise notes multiple times.
- Do daily answer writing for Mains (even 1–2 answers).

## Answer-writing basics

- Address the directive (analyze, discuss, evaluate).
- Use headings, subheadings, and a clear conclusion.
- Add examples, data, and diagrams where appropriate.
$$
from public.exams e where e.slug = 'upsc-cse'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.pyq (exam_id, content_markdown)
select e.id, $$
## UPSC CSE previous year question papers (PYQs)

UPSC PYQs are the single best tool to understand the level and direction of questions.

## How to use PYQs

### Prelims

- Solve topic-wise to identify recurring areas.
- Focus on eliminating options and improving accuracy.

### Mains

- Rewrite PYQ answers with structure and word limit.
- Compare your answer to model frameworks (not rote answers).

## What to track

- Topics repeatedly asked
- Weak areas in fundamentals
- Your answer-writing speed and structure
$$
from public.exams e where e.slug = 'upsc-cse'
on conflict (exam_id) do update set content_markdown = excluded.content_markdown, updated_at = now();

insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'overview', 'How should I start UPSC preparation as a beginner?',
'Start with the syllabus and PYQs. Choose limited standard sources, build notes, and begin small but consistent answer-writing practice. Avoid collecting too many resources.', 1
from public.exams e where e.slug = 'upsc-cse'
on conflict do nothing;

insert into public.faq (exam_id, section, question, answer, sort_order)
select e.id, 'exam-pattern', 'Is CSAT qualifying in UPSC CSE Prelims?',
'CSAT is treated as qualifying as per notification rules. Always confirm the latest minimum qualifying marks and conditions from UPSC.', 1
from public.exams e where e.slug = 'upsc-cse'
on conflict do nothing;
