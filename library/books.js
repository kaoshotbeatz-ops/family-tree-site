/* The Library — catalogue + shelf rendering + inline reader.
   Each entry is a real document held by this project. `file` = served from this
   site. `url` = held in the archive but too large to serve, so it opens at the
   institution that scanned it (marked with an arrow on the spine). */
(function () {

  var C = {
    leather:  '#6d2f28', oxblood: '#7c3530', forest: '#2f4633', navy: '#2b3a54',
    ochre:    '#8a6a2a', slate:   '#3f4a4f', plum:   '#4b3050', tan: '#7a5a34',
    moss:     '#44513a', ink:     '#33302c', rust:   '#8a4a24', teal: '#245055'
  };

  var SHELVES = [
    { id: 'conquest',
      t:  { en: 'Conquest and Colony', es: 'Conquista y Colonia', ru: 'Завоевание и колония' },
      d:  { en: 'What Spain wrote down about what Spain did — including the law that created the encomienda, and an eyewitness who watched it happen.',
            es: 'Lo que España escribió sobre lo que España hizo — incluida la ley que creó la encomienda, y un testigo que lo vio ocurrir.',
            ru: 'Что Испания записала о том, что Испания сделала, — включая закон, создавший энкомьенду, и очевидца, который это видел.' },
      books: [
        { y: '1552', c: C.oxblood, h: 'tall', file: 'las_casas_brevisima_relacion_1552.pdf',
          t: { en: 'Las Casas · Brevísima relación de la destrucción de las Indias',
               es: 'Las Casas · Brevísima relación de la destrucción de las Indias',
               ru: 'Лас Касас · Кратчайшее сообщение о разрушении Индий' },
          m: { en: 'Original 1552 Spanish. Contains the chapter “De las dos yslas de Sant Juan y Jamayca” — on Puerto Rico specifically. Eyewitness.',
               es: 'Español original de 1552. Contiene el capítulo «De las dos yslas de Sant Juan y Jamayca» — sobre Puerto Rico. Testigo presencial.',
               ru: 'Оригинал 1552 года на испанском. Содержит главу «De las dos yslas de Sant Juan y Jamayca» — именно о Пуэрто-Рико. Очевидец.' } },
        { y: '1681', c: C.leather, h: 'tall', big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/encomienda/recopilacion_leyes_indias_1681_v1.pdf?fx=2',
          t: { en: 'Recopilación de Leyes de los Reynos de las Indias',
               es: 'Recopilación de Leyes de los Reynos de las Indias',
               ru: 'Свод законов королевств Индий' },
          m: { en: 'The compiled royal law of the Spanish Indies — the statutory basis of the encomienda, encomenderos and tribute. 80MB; held in the archive.',
               es: 'El derecho real compilado de las Indias españolas — la base legal de la encomienda, los encomenderos y el tributo. 80MB; en el archivo.',
               ru: 'Свод королевского права Испанских Индий — законная основа энкомьенды, энкомендеро и подати. 80 МБ; хранится в архиве.' } },
        { y: '1508', c: C.rust, h: 'short', file: 'herrera_1601_agueybana_pp228-231.pdf',
          t: { en: 'EXHIBIT · Agüeybaná receives Ponce de León — the printed leaf',
               es: 'DOCUMENTO · Agüeybaná recibe a Ponce de León — la hoja impresa',
               ru: 'ЭКСПОНАТ · Агейбана принимает Понсе де Леона — печатный лист' },
          m: { en: 'Herrera, Década I, Libro VII, Cap. IIII. The two pages, photographed. The welcome “con mucho amor”, the guatiao name-exchange, the renaming of doña Inés and don Francisco, the gold rivers Manatuabon and Cebuco, and the Castilians left “muy encomendados al Cazique”.',
               es: 'Herrera, Década I, Libro VII, Cap. IIII. Las dos páginas, fotografiadas. El recibimiento «con mucho amor», el intercambio de nombres guatiao, el renombramiento de doña Inés y don Francisco, los ríos de oro Manatuabon y Cebuco, y los castellanos dejados «muy encomendados al Cazique».',
               ru: 'Эррера, Década I, Libro VII, Cap. IIII. Две страницы, сфотографированные. Приём «con mucho amor», обмен именами guatiao, переименование доньи Инес и дона Франсиско, золотые реки Manatuabon и Cebuco и кастильцы, оставленные «muy encomendados al Cazique».' } },
        { y: '1601', c: C.moss, h: 'tall', big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/voyages/herrera_decadas_I-II_1601.pdf?fx=2',
          t: { en: 'Herrera · Historia general — Década I',
               es: 'Herrera · Historia general — Década I',
               ru: 'Эррера · Всеобщая история — Декада I' },
          m: { en: 'Spain’s official crown chronicle. Records Agüeybaná receiving Ponce de León “con mucho amor”, and his successor later listed “en su repartimiento” as property. 104MB; held in the archive.',
               es: 'La crónica oficial de la corona española. Registra a Agüeybaná recibiendo a Ponce de León «con mucho amor», y a su sucesor luego listado «en su repartimiento» como propiedad. 104MB; en el archivo.',
               ru: 'Официальная хроника испанской короны. Фиксирует, как Агейбана принял Понсе де Леона «con mucho amor», а его преемник позже значился «en su repartimiento» как имущество. 104 МБ; в архиве.' } },
        { y: '1726', c: C.tan, big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/voyages/herrera_historia_general_1726_v4.pdf?fx=2',
          t: { en: 'Herrera · Historia general — 1726 edition',
               es: 'Herrera · Historia general — edición de 1726',
               ru: 'Эррера · Всеобщая история — издание 1726' },
          m: { en: 'The index volume that located the Agüeybaná and Salcedo entries. 80MB; held in the archive.',
               es: 'El tomo índice que permitió localizar las entradas de Agüeybaná y Salcedo. 80MB; en el archivo.',
               ru: 'Том-указатель, по которому были найдены записи об Агейбане и Сальседо. 80 МБ; в архиве.' } },
        { y: '1726', c: C.tan, h: 'short', big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/voyages/herrera_historia_general_1726_v2.pdf?fx=2',
          t: { en: 'Herrera · Historia general — 1726, vol. 2', es: 'Herrera · Historia general — 1726, tomo 2', ru: 'Эррера · Всеобщая история — 1726, том 2' },
          m: { en: 'Second index volume of the 1726 edition. 63MB.', es: 'Segundo tomo índice de la edición de 1726. 63MB.', ru: 'Второй том-указатель издания 1726 года. 63 МБ.' } },
        { y: '1892', c: C.navy, file: 'columbus_writings_letters.pdf',
          t: { en: 'Writings of Christopher Columbus', es: 'Escritos de Cristóbal Colón', ru: 'Сочинения Христофора Колумба' },
          m: { en: 'Ed. Paul Leicester Ford, 1892. 268 pages.', es: 'Ed. Paul Leicester Ford, 1892. 268 páginas.', ru: 'Ред. Paul Leicester Ford, 1892. 268 страниц.' } },
        { y: '1847', c: C.teal, big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/voyages/columbus_select_letters_hakluyt.pdf?fx=2',
          t: { en: 'Letters of Columbus · all four voyages', es: 'Cartas de Colón · los cuatro viajes', ru: 'Письма Колумба · все четыре плавания' },
          m: { en: 'Hakluyt Society, ed. R. H. Major. 428 pages of original documents. 26MB; held in the archive.',
               es: 'Hakluyt Society, ed. R. H. Major. 428 páginas de documentos originales. 26MB; en el archivo.',
               ru: 'Hakluyt Society, ред. R. H. Major. 428 страниц оригинальных документов. 26 МБ; в архиве.' } }
      ] },

    { id: 'handover',
      t: { en: 'The Handover', es: 'El Traspaso', ru: 'Передача' },
      d: { en: 'Self-government won from Spain, and the treaty that erased it a year later.',
           es: 'El autogobierno ganado a España, y el tratado que lo borró un año después.',
           ru: 'Самоуправление, отвоёванное у Испании, и договор, стёрший его через год.' },
      books: [
        { y: '1897', c: C.ochre, file: 'carta_autonomica_1897_BOE-A-1897-6870.pdf',
          t: { en: 'Carta Autonómica · Gaceta de Madrid', es: 'Carta Autonómica · Gaceta de Madrid', ru: 'Хартия автономии · Gaceta de Madrid' },
          m: { en: 'Spain’s own state gazette, 28 Nov 1897. Art. 2 gives Puerto Rico a two-chamber insular parliament. Seated July 1898; dissolved by the US occupation weeks later.',
               es: 'La gaceta oficial de España, 28 nov 1897. El art. 2 da a Puerto Rico un parlamento insular de dos cámaras. Instalado en julio de 1898; disuelto por la ocupación semanas después.',
               ru: 'Официальная газета Испании, 28 ноября 1897. Ст. 2 даёт Пуэрто-Рико двухпалатный островной парламент. Начал работу в июле 1898; распущен оккупацией через недели.' } },
        { y: '1897', c: C.ochre, h: 'short', file: 'decretos_autonomia_antillas_1897.pdf',
          t: { en: 'Decretos estableciendo la autonomía en las Antillas', es: 'Decretos estableciendo la autonomía en las Antillas', ru: 'Декреты об установлении автономии на Антильских островах' },
          m: { en: 'Companion volume to the Charter.', es: 'Tomo complementario de la Carta.', ru: 'Дополнительный том к Хартии.' } },
        { y: '1898', c: C.oxblood, file: 'treaty1898_statutes_at_large_30stat1754.pdf',
          t: { en: 'Treaty of Paris · 30 Stat. 1754', es: 'Tratado de París · 30 Stat. 1754', ru: 'Парижский договор · 30 Stat. 1754' },
          m: { en: 'The official statutory text. Article I relinquishes Cuba. Article II cedes Puerto Rico. Article IX leaves the people’s status “to be determined by the Congress.”',
               es: 'El texto legal oficial. El Artículo I renuncia a Cuba. El II cede Puerto Rico. El IX deja el estatus del pueblo «a determinación del Congreso».',
               ru: 'Официальный законодательный текст. Статья I отказывается от Кубы. Статья II уступает Пуэрто-Рико. Статья IX оставляет статус народа «на определение Конгресса».' } },
        { y: '1899', c: C.slate, big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/treaty1898/treaty1898_senate_doc_with_map_IA.pdf?fx=2',
          t: { en: 'Treaty of Peace · Senate document with map', es: 'Tratado de Paz · documento del Senado con mapa', ru: 'Мирный договор · документ Сената с картой' },
          m: { en: 'The President’s message transmitting the treaty, with the Paris conference protocols. 63MB; held in the archive.',
               es: 'El mensaje del Presidente transmitiendo el tratado, con los protocolos de la conferencia de París. 63MB; en el archivo.',
               ru: 'Послание президента о передаче договора с протоколами Парижской конференции. 63 МБ; в архиве.' } },
        { y: '1900', c: C.rust, file: 'puertoricoembrac00unit.pdf',
          t: { en: 'Reports of Brig. Gen. Geo. W. Davis, military governor', es: 'Informes del Gral. Geo. W. Davis, gobernador militar', ru: 'Отчёты бриг. ген. Дж. У. Дэвиса, военного губернатора' },
          m: { en: 'The military government district by district — including a chapter on Arecibo, this family’s own.',
               es: 'El gobierno militar distrito por distrito — incluido un capítulo sobre Arecibo, el de esta familia.',
               ru: 'Военное правительство по округам — включая главу об Аресибо, родном для этой семьи.' } },
        { y: '1900', c: C.rust, h: 'tall', big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/occupation/reportonislandof00unit.pdf?fx=2',
          t: { en: 'Report on the Island of Porto Rico (Carroll)', es: 'Informe sobre la Isla de Puerto Rico (Carroll)', ru: 'Доклад об острове Пуэрто-Рико (Кэрролл)' },
          m: { en: 'The survey made for President McKinley. States the peso passed “at a little more than 60 cents.” 70MB; held in the archive.',
               es: 'El estudio hecho para el presidente McKinley. Dice que el peso se recibía «a poco más de 60 centavos». 70MB; en el archivo.',
               ru: 'Обследование для президента Мак-Кинли. Указывает, что песо принимали «чуть дороже 60 центов». 70 МБ; в архиве.' } },
        { y: '1903', c: C.moss, big: 'https://dbaomarhuertasllc.com/family-media/archive/colonial-record-sources/occupation/reportcommissio09educgoog.pdf?fx=2',
          t: { en: 'Report of the Commissioner of Education for Porto Rico', es: 'Informe del Comisionado de Instrucción de Puerto Rico', ru: 'Отчёт комиссара образования Пуэрто-Рико' },
          m: { en: '1,116 teachers, 99 of them “teachers of English… Americans appointed by the Department directly.” Also counts teachers by race. 29MB; held in the archive.',
               es: '1,116 maestros, 99 de ellos «maestros de inglés… estadounidenses nombrados directamente por el Departamento». También cuenta maestros por raza. 29MB; en el archivo.',
               ru: '1116 учителей, 99 из них «учителя английского… американцы, назначенные Департаментом напрямую». Также ведёт учёт учителей по расе. 29 МБ; в архиве.' } }
      ] },

    { id: 'courts',
      t: { en: 'The Courts', es: 'Los Tribunales', ru: 'Суды' },
      d: { en: 'Five opinions that built and kept the doctrine — belongs to, but is not part of.',
           es: 'Cinco opiniones que construyeron y mantuvieron la doctrina — pertenece a, pero no es parte de.',
           ru: 'Пять решений, создавших и сохранивших доктрину: принадлежит, но не является частью.' },
      books: [
        { y: '1901', c: C.ink, h: 'tall', file: 'downes_v_bidwell_1901_182US244.pdf',
          t: { en: 'Downes v. Bidwell · 182 U.S. 244', es: 'Downes v. Bidwell · 182 U.S. 244', ru: 'Downes v. Bidwell · 182 U.S. 244' },
          m: { en: 'The case that invented “unincorporated territory.” 148 pages. Contains the “alien races” and “Anglo-Saxon character” passages. Decided 5–4.',
               es: 'El caso que inventó el «territorio no incorporado». 148 páginas. Contiene los pasajes de «razas ajenas» y «carácter anglosajón». Decidido 5–4.',
               ru: 'Дело, изобретшее «неинкорпорированную территорию». 148 страниц. Содержит пассажи о «чуждых расах» и «англосаксонском характере». Решено 5–4.' } },
        { y: '1904', c: C.ink, h: 'short', file: 'dorr_v_united_states_1904_195US138.pdf',
          t: { en: 'Dorr v. United States · 195 U.S. 138', es: 'Dorr v. United States · 195 U.S. 138', ru: 'Dorr v. United States · 195 U.S. 138' },
          m: { en: 'Jury-trial rights do not automatically follow the flag.', es: 'El derecho a jurado no sigue automáticamente a la bandera.', ru: 'Право на суд присяжных не следует автоматически за флагом.' } },
        { y: '1922', c: C.ink, h: 'short', file: 'balzac_v_porto_rico_1922_258US298.pdf',
          t: { en: 'Balzac v. Porto Rico · 258 U.S. 298', es: 'Balzac v. Porto Rico · 258 U.S. 298', ru: 'Balzac v. Porto Rico · 258 U.S. 298' },
          m: { en: 'The keystone: 1917 citizenship did not incorporate Puerto Rico and brought no jury right with it.',
               es: 'La clave de bóveda: la ciudadanía de 1917 no incorporó a Puerto Rico ni trajo el derecho a jurado.',
               ru: 'Ключевой камень: гражданство 1917 года не инкорпорировало Пуэрто-Рико и не принесло права на присяжных.' } },
        { y: '2020', c: C.slate, h: 'short', file: 'fomb_v_aurelius_2020.pdf',
          t: { en: 'FOMB v. Aurelius Investment · 590 U.S.', es: 'FOMB v. Aurelius Investment · 590 U.S.', ru: 'FOMB v. Aurelius Investment · 590 U.S.' },
          m: { en: 'Upheld the appointment structure of the unelected oversight board.', es: 'Avaló la estructura de nombramientos de la junta no electa.', ru: 'Подтвердил структуру назначения невыборного контрольного совета.' } },
        { y: '2022', c: C.slate, h: 'short', file: 'us_v_vaello_madero_2022.pdf',
          t: { en: 'United States v. Vaello Madero · 596 U.S.', es: 'United States v. Vaello Madero · 596 U.S.', ru: 'United States v. Vaello Madero · 596 U.S.' },
          m: { en: 'Congress may exclude Puerto Rico residents from SSI. Names the Insular Cases 23 times. Gorsuch concurs that they should be overruled; the Court does not overrule them.',
               es: 'El Congreso puede excluir a los residentes de Puerto Rico del SSI. Nombra los Casos Insulares 23 veces. Gorsuch concurre en que deben revocarse; el Tribunal no los revoca.',
               ru: 'Конгресс вправе исключить жителей Пуэрто-Рико из SSI. Называет Островные дела 23 раза. Горсач пишет, что их следует отменить; суд их не отменяет.' } }
      ] },

    { id: 'laws',
      t: { en: 'The Laws', es: 'Las Leyes', ru: 'Законы' },
      d: { en: 'The statutes themselves — including the one that devalued the peso to sixty cents in writing.',
           es: 'Los estatutos mismos — incluido el que devaluó el peso a sesenta centavos por escrito.',
           ru: 'Сами законы — включая тот, что письменно обесценил песо до шестидесяти центов.' },
      books: [
        { y: '1900', c: C.forest, file: 'foraker_act_1900_31stat77.pdf',
          t: { en: 'Foraker Act · 31 Stat. 77', es: 'Ley Foraker · 31 Stat. 77', ru: 'Закон Форакера · 31 Stat. 77' },
          m: { en: '“Temporarily to provide revenues and a civil government.” Sets the peso at sixty cents, taxes trade at 15% of the foreign rate, invents “citizens of Porto Rico,” and reserves to Congress the power to annul.',
               es: '«Temporalmente para proveer rentas y un gobierno civil». Fija el peso en sesenta centavos, grava el comercio al 15% de la tasa extranjera, inventa los «ciudadanos de Puerto Rico» y reserva al Congreso el poder de anular.',
               ru: '«Временно обеспечить доходы и гражданское правительство». Устанавливает песо в шестьдесят центов, облагает торговлю 15% от иностранной ставки, изобретает «граждан Пуэрто-Рико» и оставляет Конгрессу право аннулировать.' } },
        { y: '1917', c: C.forest, file: 'jones_shafroth_act_1917_39stat951.pdf',
          t: { en: 'Jones–Shafroth Act · 39 Stat. 951', es: 'Ley Jones–Shafroth · 39 Stat. 951', ru: 'Закон Джонса–Шафрота · 39 Stat. 951' },
          m: { en: 'Statutory citizenship, signed 2 March 1917 — thirty-five days before the US entered the war. Prints the oath for refusing it.',
               es: 'Ciudadanía estatutaria, firmada el 2 de marzo de 1917 — treinta y cinco días antes de que EE.UU. entrara en la guerra. Imprime el juramento para rechazarla.',
               ru: 'Статутное гражданство, подписано 2 марта 1917 — за тридцать пять дней до вступления США в войну. Печатает текст присяги для отказа от него.' } },
        { y: '1920', c: C.navy, file: 'merchant_marine_jones_act_1920_41stat988.pdf',
          t: { en: 'Merchant Marine Act (“Jones Act”) · 41 Stat. 988', es: 'Ley de Marina Mercante («Ley Jones») · 41 Stat. 988', ru: 'Закон о торговом флоте («Закон Джонса») · 41 Stat. 988' },
          m: { en: 'A different law by a different Jones. The shipping restriction that still raises the cost of everything imported.',
               es: 'Una ley distinta de un Jones distinto. La restricción marítima que aún encarece todo lo importado.',
               ru: 'Другой закон другого Джонса. Судоходное ограничение, которое до сих пор удорожает всё ввозимое.' } },
        { y: '1950', c: C.forest, h: 'short', file: 'public_law_600_1950_64stat319.pdf',
          t: { en: 'Public Law 600 · 64 Stat. 319', es: 'Ley Pública 600 · 64 Stat. 319', ru: 'Публичный закон 600 · 64 Stat. 319' },
          m: { en: 'Authorised Puerto Rico’s own constitution — leaving the territorial status underneath it untouched. The revolt of October 1950 rose against this.',
               es: 'Autorizó la constitución propia de Puerto Rico — dejando intacto el estatus territorial por debajo. La revuelta de octubre de 1950 se alzó contra esto.',
               ru: 'Разрешил Пуэрто-Рико собственную конституцию, оставив территориальный статус под ней нетронутым. Восстание октября 1950 года поднялось против этого.' } },
        { y: '2014', c: C.ochre, h: 'short', file: 'borinqueneers_gold_medal_PL113-120_2014.pdf',
          t: { en: 'Congressional Gold Medal · 65th Infantry', es: 'Medalla de Oro del Congreso · Regimiento 65', ru: 'Золотая медаль Конгресса · 65-й пехотный полк' },
          m: { en: 'Congress’s own findings on the Borinqueneers, including the discrimination they served under. The Army apologised in 2016 — sixty-four years late.',
               es: 'Los hallazgos del propio Congreso sobre los Borinqueneers, incluida la discriminación bajo la que sirvieron. El Ejército se disculpó en 2016 — con sesenta y cuatro años de retraso.',
               ru: 'Собственные выводы Конгресса о «боринкенцах», включая дискриминацию, в которой они служили. Армия извинилась в 2016 году — с опозданием на шестьдесят четыре года.' } },
        { y: '2016', c: C.plum, h: 'short', file: 'promesa_PL114-187_2016.pdf',
          t: { en: 'PROMESA · Public Law 114-187', es: 'PROMESA · Ley Pública 114-187', ru: 'PROMESA · Публичный закон 114-187' },
          m: { en: 'Creates the Financial Oversight and Management Board — seven members appointed from Washington, able to override the elected government.',
               es: 'Crea la Junta de Supervisión y Administración Financiera — siete miembros nombrados desde Washington, con poder sobre el gobierno electo.',
               ru: 'Создаёт Совет финансового надзора и управления — семь членов, назначаемых из Вашингтона, с правом отменять решения избранного правительства.' } }
      ] },

    { id: 'modern',
      t: { en: 'The Modern Record', es: 'El Registro Moderno', ru: 'Современная летопись' },
      d: { en: 'The government auditing itself — the storm, the bombing range, the coal ash, the reactor.',
           es: 'El gobierno auditándose a sí mismo — la tormenta, el campo de bombardeo, las cenizas de carbón, el reactor.',
           ru: 'Государство, проверяющее само себя: шторм, полигон, угольная зола, реактор.' },
      books: [
        { y: '2018', c: C.teal, file: 'gwu_maria_excess_mortality_2018.pdf',
          t: { en: 'Hurricane María · excess mortality study', es: 'Huracán María · estudio de mortalidad en exceso', ru: 'Ураган «Мария» · исследование избыточной смертности' },
          m: { en: 'George Washington University with the University of Puerto Rico. 69 pages. The figure 2,975 is in the document itself; the government had said 64.',
               es: 'Universidad George Washington con la Universidad de Puerto Rico. 69 páginas. La cifra 2,975 está en el documento; el gobierno había dicho 64.',
               ru: 'Университет Джорджа Вашингтона с Университетом Пуэрто-Рико. 69 страниц. Цифра 2975 есть в самом документе; правительство называло 64.' } },
        { y: '2019', c: C.slate, file: 'gao_19-256_maria_fema_funding_oversight.pdf',
          t: { en: 'GAO-19-256 · FEMA funding and oversight', es: 'GAO-19-256 · fondos y supervisión de FEMA', ru: 'GAO-19-256 · финансирование и надзор FEMA' },
          m: { en: 'Congress’s own auditors on the recovery.', es: 'Los auditores del propio Congreso sobre la recuperación.', ru: 'Собственные аудиторы Конгресса о восстановлении.' } },
        { y: '2024', c: C.slate, h: 'short', file: 'gao_24-105557_pr_disasters_progress.pdf',
          t: { en: 'GAO-24-105557 · Puerto Rico Disasters', es: 'GAO-24-105557 · Desastres en Puerto Rico', ru: 'GAO-24-105557 · Катастрофы в Пуэрто-Рико' },
          m: { en: 'Progress made, but the recovery continues to face challenges.', es: 'Se avanzó, pero la recuperación sigue enfrentando retos.', ru: 'Прогресс есть, но восстановление по-прежнему сталкивается с трудностями.' } },
        { y: '2020', c: C.rust, h: 'short', file: 'dhs_OIG-20-76.pdf',
          t: { en: 'DHS OIG-20-76 · FEMA mismanaged distribution', es: 'DHS OIG-20-76 · FEMA manejó mal la distribución', ru: 'DHS OIG-20-76 · FEMA плохо управляла распределением' },
          m: { en: 'Titled, in the agency’s own words, “FEMA Mismanaged the Commodity Distribution Process.” Puerto Rico is named 92 times.',
               es: 'Titulado, en palabras de la propia agencia, «FEMA manejó mal el proceso de distribución de suministros». Puerto Rico se nombra 92 veces.',
               ru: 'Озаглавлен словами самого ведомства: «FEMA плохо управляла распределением грузов». Пуэрто-Рико назван 92 раза.' } },
        { y: '2005', c: C.moss, h: 'short', file: 'dtic_vieques_culebra_cleanup_analysis.pdf',
          t: { en: 'CRS RL32533 · Vieques and Culebra cleanup', es: 'CRS RL32533 · limpieza de Vieques y Culebra', ru: 'CRS RL32533 · очистка Вьекеса и Кулебры' },
          m: { en: 'Live fire on Culebra through 1975. $112.6M still needed. The contaminated land became a Wilderness Area where public access is prohibited.',
               es: 'Fuego real en Culebra hasta 1975. Faltaban $112.6M. La tierra contaminada pasó a ser un Área Silvestre con acceso público prohibido.',
               ru: 'Боевые стрельбы на Кулебре до 1975 года. Требовалось ещё $112,6 млн. Загрязнённая земля стала «зоной дикой природы» с запретом доступа.' } },
        { y: '2003', c: C.plum, h: 'short', file: 'doe_bonus_reactor_rincon_ea1394.pdf',
          t: { en: 'DOE EA-1394 · BONUS reactor, Rincón', es: 'DOE EA-1394 · reactor BONUS, Rincón', ru: 'DOE EA-1394 · реактор BONUS, Ринкон' },
          m: { en: 'The Atomic Energy Commission’s experimental reactor. Pressure vessel entombed in place; “radioactive material is present in some areas.”',
               es: 'El reactor experimental de la Comisión de Energía Atómica. Vasija sepultada en el sitio; «hay material radiactivo presente en algunas áreas».',
               ru: 'Экспериментальный реактор Комиссии по атомной энергии. Корпус замурован на месте; «в некоторых зонах присутствует радиоактивный материал».' } },
        { y: '2019', c: C.ink, h: 'short', file: 'congress_testimony_coal_ash_guayama_2019.pdf',
          t: { en: 'House testimony · AES coal ash, Guayama', es: 'Testimonio ante la Cámara · cenizas de carbón AES, Guayama', ru: 'Показания в Палате · угольная зола AES, Гуаяма' },
          m: { en: 'Sworn testimony to the House Committee on Energy and Commerce, 20 Nov 2019.',
               es: 'Testimonio jurado ante el Comité de Energía y Comercio de la Cámara, 20 nov 2019.',
               ru: 'Показания под присягой Комитету Палаты по энергетике и торговле, 20 ноября 2019.' } }
      ] },

    { id: 'family',
      t: { en: 'This Family’s Own Records', es: 'Los Registros de Esta Familia', ru: 'Собственные записи этой семьи' },
      d: { en: 'The certificates behind the names in the book. Real paper, real signatures, real people.',
           es: 'Los certificados detrás de los nombres del libro. Papel real, firmas reales, personas reales.',
           ru: 'Свидетельства, стоящие за именами в книге. Настоящая бумага, настоящие подписи, настоящие люди.' },
      books: [
        { y: '2026', c: C.forest, h: 'tall', page: '../story/',
          t: { en: 'The Line to Omar · A Family History',
               es: 'La línea hasta Omar · Una historia familiar',
               ru: 'Линия к Омару · Семейная история' },
          m: { en: 'This family\u2019s own book \u2014 73 pages, written from the documents on these shelves. Opens as a page-turning book.',
               es: 'El libro propio de esta familia \u2014 73 páginas, escrito a partir de los documentos de estos estantes. Se abre como un libro que se pasa página a página.',
               ru: 'Собственная книга этой семьи \u2014 73 страницы, написанные по документам с этих полок. Открывается как книга с перелистыванием.' } },
        { y: '1916', c: C.leather, file: 'guillermo_arocho_maria_hernandez_marriage_cert_1916.pdf',
          t: { en: 'Marriage · Guillermo Arocho & María Hernández', es: 'Matrimonio · Guillermo Arocho y María Hernández', ru: 'Брак · Гильермо Арочо и Мария Эрнандес' },
          m: { en: 'The couple on the headstone at Cementerio Privado La Santa Cruz, Arecibo. The marriage this whole tree converges on.',
               es: 'La pareja de la lápida en el Cementerio Privado La Santa Cruz, Arecibo. El matrimonio en el que converge todo este árbol.',
               ru: 'Пара с надгробия на кладбище Cementerio Privado La Santa Cruz в Аресибо. Брак, к которому сходится всё это древо.' } },
        { y: '1910', c: C.tan, file: 'martin_arocho_y_roman_death_cert_1910.pdf',
          t: { en: 'Death · Martín Arocho y Román, Lares', es: 'Defunción · Martín Arocho y Román, Lares', ru: 'Смерть · Мартин Арочо-и-Роман, Ларес' },
          m: { en: 'Died at Lares, 1910. Puerto Rico civil registry.', es: 'Falleció en Lares, 1910. Registro civil de Puerto Rico.', ru: 'Умер в Ларесе в 1910 году. Гражданский реестр Пуэрто-Рико.' } }
      ] }
  ];

  function lang() {
    try { return localStorage.getItem('fam_lang') || 'en'; } catch (e) { return 'en'; }
  }

  function render() {
    var L = lang();
    var root = document.getElementById('shelves');
    if (!root) return;
    root.innerHTML = '';
    SHELVES.forEach(function (sh) {
      var head = document.createElement('div');
      head.className = 'shelf-head';
      head.innerHTML = '<h2>' + (sh.t[L] || sh.t.en) + '</h2><p>' + (sh.d[L] || sh.d.en) + '</p>';
      root.appendChild(head);

      var row = document.createElement('div');
      row.className = 'shelf';
      sh.books.forEach(function (b) {
        var btn = document.createElement('button');
        btn.className = 'book' + (b.h ? ' ' + b.h : '') + (b.big ? ' offsite' : '');
        btn.style.background = 'linear-gradient(90deg,' + b.c + ' 0%, ' + b.c + ' 62%, rgba(0,0,0,.22) 100%)';
        btn.setAttribute('aria-label', b.t[L] || b.t.en);
        btn.innerHTML = '<span class="spine">' + (b.t[L] || b.t.en) + '</span><span class="yr-tag">' + b.y + '</span>';
        btn.addEventListener('click', function () { open(b, L); });
        row.appendChild(btn);
      });
      root.appendChild(row);
    });
  }

  var LBL = {
    en: { open: 'Open full page', close: 'Close', off: '' },
    es: { open: 'Abrir página completa', close: 'Cerrar', off: '' },
    ru: { open: 'Открыть страницу целиком', close: 'Закрыть', off: '' }
  };

  function open(b, L) {
    var r = document.getElementById('reader');
    var t = LBL[L] || LBL.en;
    document.getElementById('rtitle').textContent = b.t[L] || b.t.en;
    document.getElementById('rmeta').textContent = b.y + ' · ' + (b.m[L] || b.m.en);
    var dl = document.getElementById('rdl');
    var frame = document.getElementById('rframe');
    var note = document.getElementById('rnote');
    dl.textContent = t.open;
    if (b.page) { window.location.href = b.page; return; }
    var src = b.file ? ('docs/' + b.file) : (b.big || null);
    if (src) {
      dl.href = src; frame.src = src;
      frame.style.display = ''; note.style.display = 'none';
    } else {
      dl.href = b.url; frame.src = 'about:blank';
      frame.style.display = 'none'; note.style.display = 'flex';
      document.getElementById('rnotetext').textContent = t.off;
    }
    document.getElementById('rclose').textContent = t.close;
    r.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    var r = document.getElementById('reader');
    r.classList.remove('open');
    document.getElementById('rframe').src = 'about:blank';
    document.body.style.overflow = '';
  }

  function init() {
    render();
    var c = document.getElementById('rclose');
    if (c) c.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    var r = document.getElementById('reader');
    if (r) r.addEventListener('click', function (e) { if (e.target === r) close(); });
    // re-render the shelf when the language toggle is used
    document.addEventListener('click', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('lang-btn')) {
        setTimeout(render, 30);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
