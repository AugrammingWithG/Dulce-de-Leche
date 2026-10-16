/* Spanish (Uruguay) copy for the customer website. English line → Spanish line.
 * A first translation for the proposal: the owners should read it and correct anything that
 * doesn't sound like them. Missing lines stay in English. */
(function () {
  const W = {
    // Products and flavours (also used inside generated lines below)
    'Filled croissant': 'Medialuna rellena', 'Filled croissants': 'Medialunas rellenas', 'Loaded muffin': 'Muffin cargado', 'Loaded muffins': 'Muffins cargados',
    'Alfajor': 'Alfajor', 'Alfajores': 'Alfajores', 'Biscoff pastry': 'Hojaldre de Biscoff', 'Biscoff pastries': 'Hojaldres de Biscoff', 'Milhoja': 'Milhoja', 'Milhoja slice': 'Porción de milhoja',
    'Biscoff cheesecake': 'Cheesecake de Biscoff', 'Biscoff cheesecake slice': 'Porción de cheesecake de Biscoff', 'Continental cake': 'Torta Continental', 'Continental cake slice': 'Porción de torta Continental',
    'Chivito': 'Chivito', 'Chips': 'Papas fritas', 'Coffee': 'Café', 'Coffee from 5am': 'Café desde las 5am',
    'Dulce de leche': 'Dulce de leche', 'Chocolate': 'Chocolate', 'Pistachio': 'Pistacho', 'Berry': 'Frutos rojos', 'Kit Kat': 'Kit Kat', 'Peach': 'Durazno', 'Coconut': 'Coco',
    'Flat white': 'Flat white', 'Latte': 'Latte', 'Cortado': 'Cortado', 'Regular': 'Común',
  };
  const ALG = { gluten: 'gluten', dairy: 'lácteos', egg: 'huevo', 'tree nuts': 'frutos secos', peanuts: 'maní', soy: 'soja', sesame: 'sésamo' };
  const DOW = { Mon: 'lun', Tue: 'mar', Wed: 'mié', Thu: 'jue', Fri: 'vie', Sat: 'sáb', Sun: 'dom' };
  const DAY = { Monday: 'lunes', Tuesday: 'martes', Wednesday: 'miércoles', Thursday: 'jueves', Friday: 'viernes', Saturday: 'sábado', Sunday: 'domingo' };
  const MON = { Jan: 'ene', Feb: 'feb', Mar: 'mar', Apr: 'abr', May: 'may', Jun: 'jun', Jul: 'jul', Aug: 'ago', Sep: 'sep', Oct: 'oct', Nov: 'nov', Dec: 'dic' };
  const MONTH = { January: 'enero', February: 'febrero', March: 'marzo', April: 'abril', May: 'mayo', June: 'junio', July: 'julio', August: 'agosto', September: 'septiembre', October: 'octubre', November: 'noviembre', December: 'diciembre' };
  const OCC = { Wedding: 'Casamiento', Birthday: 'Cumpleaños', Christening: 'Bautismo', 'Something else': 'Otra ocasión', Custom: 'Personalizada' };
  const tw = s => W[s] || s;
  const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
  const lineItem = s => s.replace(/(\d+) × ([^,(]+?)(?: \(([^)]+)\))?(?=,|$)/g, (m, n, name, fl) => `${n} × ${tw(name.trim())}${fl ? ` (${lower(tw(fl.charAt(0).toUpperCase() + fl.slice(1)))})` : ''}`);
  const fullDate = s => s.replace(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) (\d+) (\w+)/, (m, d, n, mo) => `${DAY[d]} ${n} de ${MONTH[mo] || mo}`);
  const MISS = { 'add something from the menu': 'agregá algo del menú', 'pick a time': 'elegí un horario', 'add your name': 'poné tu nombre', 'add a mobile number': 'poné un celular' };
  const DET = { 'your name': 'tu nombre', 'a mobile number': 'un celular', 'a delivery address': 'una dirección de entrega' };
  const joinEs = parts => parts.length < 2 ? parts.join('') : `${parts.slice(0, -1).join(', ')} y ${parts.at(-1)}`;

  window.DDL_ES = {
    ...W,
    // Navigation and hero
    'Main': 'Principal', 'Menu': 'Menú', 'Cakes': 'Tortas', 'Order ahead': 'Pedí antes', 'Catering': 'Catering', 'Our story': 'Nuestra historia', 'Visit': 'Visitanos',
    'Order a cake': 'Encargá una torta', 'Dulce de Leche Cafe, back to top': 'Dulce de Leche Cafe, volver arriba', 'CAFE': 'CAFÉ',
    'am in Narellan': 'de la mañana en Narellan', 'Psst… scroll to lift the cloche': 'Psst… bajá para levantar la campana',
    'Authentic Uruguayan treats, baked fresh from': 'Auténticas delicias uruguayas, recién horneadas desde las',
    'Celebration cakes, filled croissants and coffee at Shop 3/25 Kirkham St, Narellan.': 'Tortas para celebrar, medialunas rellenas y café en Shop 3/25 Kirkham St, Narellan.',
    'Open 5am–5pm.': 'Abierto de 5am a 5pm.', 'Open 5am–5pm': 'Abierto de 5am a 5pm', 'Open 5am–5pm · Shop 3/25 Kirkham St, Narellan': 'Abierto de 5am a 5pm · Shop 3/25 Kirkham St, Narellan',
    'Pre-order for pickup': 'Pedí para retirar', 'Find us': 'Cómo llegar', 'Our display case needs a browser with WebGL.': 'Nuestra vitrina necesita un navegador con WebGL.',
    'A lit glass display case holding a celebration cake under a glass cloche, filled croissants, alfajores, milhoja, cheesecake and loaded muffins, with a steaming coffee on top': 'Una vitrina iluminada con una torta bajo una campana de vidrio, medialunas rellenas, alfajores, milhoja, cheesecake y muffins, y una cafetera de bronce al lado',
    // Hover cards in the case
    'Celebration cakes': 'Tortas para celebrar', 'Sugar-flower tiers with a dulce de leche drip, made to order.': 'Pisos con flores de azúcar y chorreado de dulce de leche, por encargo.', 'Design yours below': 'Diseñá la tuya abajo',
    'Puff pastry layered with dulce de leche.': 'Hojaldre en capas con dulce de leche.', 'Pre-order a slice': 'Pedí una porción', 'Made with Lotus Biscoff.': 'Hecho con Lotus Biscoff.',
    'Kit Kat muffin': 'Muffin de Kit Kat', 'Loaded, drizzled and crowned with Kit Kat.': 'Cargado, bañado y coronado con Kit Kat.', 'Dulce de leche, chocolate, pistachio and berry.': 'Dulce de leche, chocolate, pistacho y frutos rojos.',
    'Dulce de leche between soft biscuits, rolled in coconut or dipped in chocolate.': 'Dulce de leche entre tapitas suaves, con coco o bañados en chocolate.',
    'Berry muffin': 'Muffin de frutos rojos', 'Peach muffin': 'Muffin de durazno', 'Loaded muffins, baked every morning.': 'Muffins cargados, horneados cada mañana.', 'The Uruguayan classic, with dulce de leche.': 'El clásico uruguayo, con dulce de leche.',
    'Espresso from the brass machine: flat whites, lattes and cortados for the early start.': 'Espresso de la máquina de bronce: flat whites, lattes y cortados para arrancar temprano.', 'Pre-order a coffee': 'Pedí un café',
    'Espresso with plenty of steamed milk, served in a glass.': 'Espresso con mucha leche vaporizada, servido en vaso.', 'Espresso with velvety steamed milk.': 'Espresso con leche vaporizada aterciopelada.', 'Espresso cut with a little warm milk.': 'Espresso cortado con un poco de leche caliente.',
    // Ticker and menu
    'Narellan': 'Narellan', 'In the case today': 'Hoy en la vitrina',
    'Filled croissants, loaded muffins, milhoja and coffee from 5am, plus the Uruguayan chivito for a proper lunch.': 'Medialunas rellenas, muffins, milhoja y café desde las 5am, y el chivito uruguayo para almorzar como se debe.',
    'Allergens are listed on each item and are being confirmed with the bakery. If you have an allergy, tell us when you order.': 'Los alérgenos figuran en cada producto y los estamos confirmando con la panadería. Si tenés alguna alergia, avisanos al pedir.',
    'Prices shown as “from your menu” until we load your price list.': 'Precios como “de tu menú” hasta cargar tu lista de precios.',
    'Pastries': 'Medialunas y facturas', 'Cakes by the slice': 'Tortas por porción', 'Cafe and savoury': 'Café y salado', 'From your menu': 'De tu menú', 'Pre-order': 'Pedir', 'Sold out today': 'Agotado por hoy',
    'Dulce de leche, chocolate, pistachio or berry.': 'Dulce de leche, chocolate, pistacho o frutos rojos.', 'Kit Kat, berry and peach.': 'Kit Kat, frutos rojos y durazno.', 'Dulce de leche sandwiched between soft biscuits.': 'Dulce de leche entre dos tapitas suaves.',
    'Flaky pastry with Lotus Biscoff.': 'Hojaldre crocante con Lotus Biscoff.', 'Layers of puff pastry and dulce de leche, the Uruguayan classic.': 'Capas de hojaldre y dulce de leche, el clásico uruguayo.', 'Cream, sponge and fresh strawberries.': 'Crema, bizcochuelo y frutillas frescas.',
    'Uruguay’s famous steak sandwich, loaded and grilled.': 'El famoso sándwich de carne uruguayo, completo y a la plancha.', 'Flat whites, lattes and cortados for the early start.': 'Flat whites, lattes y cortados para arrancar temprano.', 'With your chivito.': 'Con tu chivito.',
    // Cakes
    'Celebration cakes, made to order': 'Tortas para celebrar, por encargo', 'Wedding tiers with sugar flowers, birthdays, christenings, photo cakes and milhoja. Tell us about your day and we’ll make it.': 'Tortas de casamiento con flores de azúcar, cumpleaños, bautismos, tortas con foto y milhoja. Contanos de tu día y la hacemos.',
    'Start from an occasion': 'Empezá por la ocasión', 'Wedding tiers': 'Tortas de casamiento', 'Birthdays': 'Cumpleaños', 'Christenings': 'Bautismos',
    'Sugar flowers, up to three tiers': 'Flores de azúcar, hasta tres pisos', 'Drips, berries and your message on top': 'Chorreado, frutos rojos y tu mensaje arriba', 'Soft colours and a gold topper': 'Colores suaves y un topper dorado', 'The Uruguayan celebration classic': 'El clásico uruguayo para celebrar',
    'A 3D preview of the cake you are designing; drag to turn it': 'Vista 3D de la torta que estás diseñando; arrastrá para girarla', 'Preview, not to scale': 'Vista previa, no a escala', 'Your cake': 'Tu torta', 'drag to turn': 'arrastrá para girar',
    'Cake order steps': 'Pasos del pedido de torta', '1. Occasion': '1. Ocasión', '2. Size': '2. Tamaño', '3. Flavour': '3. Sabor', '4. Design': '4. Diseño', '5. Date': '5. Fecha', '6. Deposit': '6. Seña',
    'What are we celebrating?': '¿Qué celebramos?', 'Pick an occasion and we’ll suggest a starting design. Nothing you change later gets overwritten.': 'Elegí la ocasión y te sugerimos un diseño para empezar. Nada de lo que cambies después se pisa.',
    'Occasion': 'Ocasión', 'Wedding': 'Casamiento', 'Birthday': 'Cumpleaños', 'Christening': 'Bautismo', 'Something else': 'Otra ocasión',
    'How big?': '¿De qué tamaño?', 'Tiers and servings set the size of your cake.': 'Los pisos y las porciones definen el tamaño de tu torta.', 'Tiers': 'Pisos', 'Servings': 'Porciones',
    'Serves 10–12': 'Para 10–12', 'Serves 20–25': 'Para 20–25', 'Serves 40–50': 'Para 40–50',
    'Flavour and filling': 'Sabor y relleno', 'Pick a sponge and a filling.': 'Elegí el bizcochuelo y el relleno.', 'Sample options; your real flavours go here.': 'Opciones de muestra; acá van tus sabores reales.',
    'Sponge': 'Bizcochuelo', 'Vanilla': 'Vainilla', 'Red velvet': 'Red velvet', 'Filling': 'Relleno', 'Strawberries and cream': 'Frutillas con crema', 'Chocolate ganache': 'Ganache de chocolate',
    'Make it yours': 'Hacela tuya', 'Choose a colour, a drip and decorations.': 'Elegí un color, un chorreado y la decoración.', 'Frosting': 'Cobertura', 'Drip': 'Chorreado', 'None': 'Ninguno', 'Decoration': 'Decoración', 'Sugar flowers': 'Flores de azúcar', 'Berries': 'Frutos rojos',
    'Cream': 'Crema', 'Blush': 'Rosado', 'Lilac': 'Lila', 'Sky': 'Celeste',
    'Message on the cake': 'Mensaje en la torta', 'e.g. Feliz cumpleaños, Mia': 'p. ej. Feliz cumpleaños, Mía', 'Inspiration photos': 'Fotos de inspiración', 'optional': 'opcional',
    'When do you need it?': '¿Para cuándo la necesitás?', 'You set the notice, closed days and cakes per day in the counter view.': 'La anticipación, los días cerrados y las tortas por día se configuran en el panel del mostrador.',
    'Collection': 'Entrega', 'Pickup': 'Retiro', 'Delivery': 'Envío',
    'Book with a deposit': 'Reservá con una seña', 'We confirm the design and final price before baking.': 'Confirmamos el diseño y el precio final antes de hornear.',
    'Size': 'Tamaño', 'Flavour': 'Sabor', 'Finish': 'Terminación', 'Message': 'Mensaje', 'Deposit': 'Seña', 'Changes': 'Cambios', 'Not chosen yet': 'Sin elegir',
    '50% to book, the rest at pickup': '50% para reservar, el resto al retirar', 'Free up to 7 days before': 'Gratis hasta 7 días antes', 'Deposit and change terms are suggestions for you to set.': 'Las condiciones de seña y cambios son sugerencias para que las definas.',
    'Your details': 'Tus datos', 'Name': 'Nombre', 'Mobile': 'Celular', 'Email': 'Correo', 'Delivery address': 'Dirección de entrega', 'Street, suburb': 'Calle, barrio',
    'Back': 'Atrás', 'Next': 'Siguiente', 'Pay deposit': 'Pagar la seña', 'Booked': 'Reservada', 'Pick a date to continue.': 'Elegí una fecha para seguir.',
    'Your cake is booked': 'Tu torta está reservada', 'We’ll confirm the design and final price, then remind you the day before pickup.': 'Te confirmamos el diseño y el precio final, y te avisamos el día antes del retiro.', 'Demo: no payment is taken.': 'Demo: no se cobra nada.',
    'Mo': 'Lu', 'Tu': 'Ma', 'We': 'Mi', 'Th': 'Ju', 'Fr': 'Vi', 'Sa': 'Sá', 'Su': 'Do',
    // Order ahead
    'Pre-order, skip the queue': 'Pedí antes y evitá la fila', 'Choose your breakfast, pick a time from 5am and pay online. We’ll text you when it’s ready on the counter.': 'Elegí tu desayuno, un horario desde las 5am y pagá online. Te mandamos un mensaje cuando esté listo en el mostrador.',
    'Your tray': 'Tu bandeja', 'Your order, laid out on a bakery tray': 'Tu pedido, servido en una bandeja', 'Add something from the menu and it lands here.': 'Agregá algo del menú y aparece acá.',
    'Your order': 'Tu pedido', 'Nothing here yet. Add something from the menu.': 'Todavía no hay nada. Agregá algo del menú.', 'Pickup day': 'Día de retiro', 'Pickup time': 'Hora de retiro', 'Time of day': 'Momento del día',
    'Early': 'Temprano', 'Morning': 'Mañana', 'Afternoon': 'Tarde', 'Total': 'Total', 'Totals appear once your price list is loaded.': 'Los totales aparecen cuando cargues tu lista de precios.',
    'Pay and place order': 'Pagar y hacer el pedido', 'Order placed': 'Pedido hecho', 'Shown at checkout': 'Se muestra al pagar', 'Start a new order': 'Empezar otro pedido', 'Demo: no payment taken.': 'Demo: no se cobró nada.',
    'Welcome back.': 'Qué bueno verte de nuevo.', 'Your usual:': 'Lo de siempre:', 'Add it again': 'Pedirlo de nuevo', 'Your usual order is on the ticket. Pick a time to finish.': 'Tu pedido de siempre ya está en el ticket. Elegí un horario para terminar.',
    'Add chips': 'Agregar papas fritas', 'Your order (2)': 'Tu pedido (2)', 'Quick actions': 'Accesos rápidos', 'Directions': 'Cómo llegar',
    // Catering
    'Catering for offices, parties and events': 'Catering para oficinas, fiestas y eventos', 'A serving board laid out for your event': 'Una tabla servida para tu evento', 'Choose a platter': 'Elegí una bandeja',
    'Croissant platters': 'Bandejas de medialunas', 'Filled croissants for morning meetings, from 5am pickup.': 'Medialunas rellenas para reuniones de mañana, retiro desde las 5am.',
    'Alfajor and sweets boxes': 'Cajas de alfajores y dulces', 'Gift boxes for clients, staff and celebrations.': 'Cajas de regalo para clientes, equipo y celebraciones.',
    'Chivito and sandwich platters': 'Bandejas de chivitos y sándwiches', 'A Uruguayan lunch for the whole team.': 'Un almuerzo uruguayo para todo el equipo.',
    'Event and wedding cakes': 'Tortas para eventos y casamientos', 'Delivered and set up on the day.': 'Entregadas y armadas el mismo día.', 'To confirm with you.': 'A confirmar con ustedes.',
    'Suggested quantities, to confirm.': 'Cantidades sugeridas, a confirmar.', 'Tell us about your event': 'Contanos de tu evento', 'Your name': 'Tu nombre', 'Phone': 'Teléfono', 'Date': 'Fecha', 'Guests': 'Invitados',
    '5 fewer guests': '5 invitados menos', '5 more guests': '5 invitados más', 'Anything else?': '¿Algo más?', 'e.g. half pistachio, delivered by 8am': 'p. ej. mitad pistacho, entregado antes de las 8am',
    'Send enquiry': 'Enviar consulta', 'Thanks! We’ll reply within a day.': '¡Gracias! Te respondemos en el día.', 'Demo: nothing was sent.': 'Demo: no se envió nada.',
    // Story, visit, dashboard, footer
    'From Uruguay to Narellan': 'De Uruguay a Narellan', '“Our mission is to celebrate and grow Latin American culture in Macarthur and beyond.”': '“Nuestra misión es celebrar y hacer crecer la cultura latinoamericana en Macarthur y más allá.”',
    'A brass Sun of May, the sun from the Uruguayan flag': 'Un Sol de Mayo de bronce, el sol de la bandera uruguaya',
    'Your story goes here in your own words: where the recipes come from, who bakes them, and why Narellan. We’ll write it with you.': 'Acá va tu historia, con tus palabras: de dónde vienen las recetas, quién las hornea y por qué Narellan. La escribimos con vos.',
    'Authentic Uruguayan treats': 'Auténticas delicias uruguayas', 'Macarthur Latin Food Market': 'Macarthur Latin Food Market', 'Opening 20 October': 'Abrimos el 20 de octubre',
    'Come by the counter': 'Pasá por el mostrador', 'Address': 'Dirección', 'Hours': 'Horario', 'Grand opening': 'Gran apertura', 'Tuesday 20 October': 'Martes 20 de octubre', 'Opening days to confirm': 'Días de apertura a confirmar',
    'Get directions': 'Cómo llegar', 'Reviews on Google': 'Reseñas en Google', 'Map of Shop 3/25 Kirkham St, Narellan': 'Mapa de Shop 3/25 Kirkham St, Narellan',
    'Once your Google Business Profile is live, your star rating and latest reviews can show here, and Google Maps lists you with your hours.': 'Cuando tu perfil de Google Business esté activo, tus estrellas y últimas reseñas pueden aparecer acá, y Google Maps te muestra con tu horario.',
    'Behind the counter: your dashboard': 'Detrás del mostrador: tu panel', 'Every cake request and pre-order lands in one place. Set your daily cake limits, mark orders ready, and sell out an item with one tap.': 'Todos los pedidos de tortas y encargos llegan a un solo lugar. Definí cuántas tortas hacés por día, marcá pedidos listos y agotá un producto con un toque.',
    'Open the counter view': 'Abrir el panel del mostrador', 'Live demo: orders you place on this page appear there.': 'Demo en vivo: los pedidos que hagas en esta página aparecen ahí.',
    'Today': 'Hoy', 'Cake calendar': 'Calendario de tortas', 'Customers': 'Clientes', 'Today’s pickups': 'Retiros de hoy', '(sample data)': '(datos de muestra)', 'Ready': 'Listo', 'Baking': 'En el horno', 'Decorating': 'Decorando', 'Queued': 'En cola',
    'Cake calendar · October': 'Calendario de tortas · octubre', 'Outlined: grand opening. Bars show cake bookings.': 'Marcado: gran apertura. Las barras muestran reservas de tortas.',
    'Kit Kat muffins': 'Muffins de Kit Kat', 'Kit Kat muffins available': 'Muffins de Kit Kat disponibles', 'Milhoja slices': 'Porciones de milhoja', 'Milhoja slices available': 'Porciones de milhoja disponibles', 'Pistachio croissants': 'Medialunas de pistacho', 'Pistachio croissants available': 'Medialunas de pistacho disponibles',
    '2 dulce de leche croissants, 1 flat white': '2 medialunas de dulce de leche, 1 flat white', 'Croissant platter for 12': 'Bandeja de medialunas para 12', 'Birthday cake · 2 tiers · dulce de leche drip': 'Torta de cumpleaños · 2 pisos · chorreado de dulce de leche', 'Chivito with chips, 2 alfajores': 'Chivito con papas fritas, 2 alfajores',
    'Authentic Uruguayan treats in Narellan.': 'Auténticas delicias uruguayas en Narellan.', 'Follow': 'Seguinos', 'Staff': 'Equipo', 'Counter view': 'Panel del mostrador',
    'Website mockup by Cre8tive Sync · Photos, prices, policies and sample orders are placeholders': 'Maqueta web de Cre8tive Sync · Fotos, precios, políticas y pedidos de muestra son provisorios',
    'Allergens · Policies · ABN to come': 'Alérgenos · Políticas · ABN próximamente', 'Pitch notes': 'Notas de propuesta',
  };

  window.DDL_ES_RX = [
    [/^(\d+) items? on your tray$/, (m, n) => `${n} ${n === '1' ? 'producto' : 'productos'} en tu bandeja`],
    [/^Pre-order (.+)$/, (m, x) => `Pedir ${tw(x)}`], [/^Add one (.+)$/, (m, x) => `Agregar ${tw(x)}`], [/^Remove one (.+)$/, (m, x) => `Quitar ${tw(x)}`],
    [/^(.+) quantity$/, (m, x) => `Cantidad: ${tw(x)}`], [/^(.+) flavour$/, (m, x) => `Sabor: ${tw(x)}`],
    [/^Added \((\d+)\)$/, 'Agregado ($1)'], [/^(.+) →$/, (m, x) => `${window.DDL_ES[x] || x} →`],
    [/^Tap again to pre-order →$/, 'Tocá de nuevo para pedir →'],
    [/^Contains (.+)$/, (m, x) => 'Contiene ' + x.split(/(, | · )/).map(p => ALG[p] || p).join('')],
    [/^To continue, (.+)\.$/, (m, x) => 'Para seguir, ' + joinEs(x.split(/, | and /).map(p => MISS[p] || p)) + '.'],
    [/^Add (.+) to book\.$/, (m, x) => 'Agregá ' + joinEs(x.split(/, | and /).map(p => DET[p] || p)) + ' para reservar.'],
    [/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d+) (\w{3})$/, (m, d, n, mo) => `${DOW[d]} ${n} ${MON[mo] || mo}`],
    [/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/, (m, mo, y) => `${MONTH[mo].charAt(0).toUpperCase() + MONTH[mo].slice(1)} ${y}`],
    [/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) \d+ \w+$/, m => fullDate(m)],
    [/^(Wedding|Birthday|Christening|Custom) cakes need (\d+) days’ notice, so only days we can bake for are open\.$/, (m, o, n) => `Las tortas de ${lower(OCC[o])} necesitan ${n} días de anticipación, así que solo están abiertos los días en que podemos hornear.`],
    [/^Custom cakes need (\d+) days’ notice, so only days we can bake for are open\.$/, 'Las tortas personalizadas necesitan $1 días de anticipación, así que solo están abiertos los días en que podemos hornear.'],
    [/^(.+) cake$/, (m, o) => OCC[o] ? `Torta de ${lower(OCC[o])}` : m],
    [/^· (\d) tiers? · serves (.+)$/, (m, n, s) => `· ${n} ${n === '1' ? 'piso' : 'pisos'} · para ${s}`],
    [/^(\d) tiers?, serves (.+)$/, (m, n, s) => `${n} ${n === '1' ? 'piso' : 'pisos'}, para ${s}`],
    [/^(Vanilla|Chocolate|Red velvet) with (.+)$/, (m, a, b) => `${window.DDL_ES[a] || a} con ${lower(window.DDL_ES[b.charAt(0).toUpperCase() + b.slice(1)] || b)}`],
    [/^(\d+) (.+) selected$/, (m, d, mo) => `${d} ${mo} seleccionado`],
    [/^(.+) selected$/, (m, x) => `${window.DDL_ES[x] || x} seleccionado`],
    [/^(\d+) \w+, (too soon to bake|closed|fully booked)$/, m => m.replace('too soon to bake', 'muy pronto para hornear').replace('fully booked', 'completo').replace('closed', 'cerrado')],
    [/^(Too soon to bake|Closed|Fully booked)$/, m => ({ 'Too soon to bake': 'Muy pronto para hornear', Closed: 'Cerrado', 'Fully booked': 'Completo' })[m]],
    [/^Thanks, (.+)\. We’ll text (.+) to confirm the design and final price, then remind you the day before (pickup|delivery)\.$/, (m, n, p, k) => `Gracias, ${n}. Te escribimos al ${p} para confirmar el diseño y el precio final, y te avisamos el día antes del ${k === 'pickup' ? 'retiro' : 'envío'}.`],
    [/^Order placed for (.+), (\w+day \d+ \w+)\.$/, (m, t, d) => `Pedido hecho para las ${t}, ${fullDate(d)}.`],
    [/^We’ll text (.+) when it’s on the counter\.$/, 'Te escribimos al $1 cuando esté en el mostrador.'],
    [/^(\$[\d.]+) \+ menu items$/, '$1 + productos del menú'],
    [/^(.+) added\. (\d+) items? in your order\.$/, (m, x, n) => `${tw(x)} agregado. ${n} ${n === '1' ? 'producto' : 'productos'} en tu pedido.`],
    [/^Welcome back, (.+)\.$/, '¡Hola de nuevo, $1!'],
    [/^\d+ × .+$/, m => lineItem(m)],
    [/^(\d+) filled croissants$/, '$1 medialunas rellenas'], [/^(\d+) chivitos$/, '$1 chivitos'], [/^A (\d)-tier cake$/, 'Una torta de $1 pisos'],
    [/^(\d+) alfajores in (\d+) gift box(es)?$/, (m, a, b) => `${a} alfajores en ${b} ${b === '1' ? 'caja' : 'cajas'} de regalo`],
    [/^for (\d+) guests?$/, (m, n) => `para ${n} ${n === '1' ? 'invitado' : 'invitados'}`],
    [/^(\d+)\/26$/, '$1/26'], [/^(\d+) photos? added$/, (m, n) => `${n} ${n === '1' ? 'foto agregada' : 'fotos agregadas'}`],
    [/^Inspiration photo (\d+)$/, 'Foto de inspiración $1'], [/^Remove photo (\d+)$/, 'Quitar foto $1'],
  ];
})();
