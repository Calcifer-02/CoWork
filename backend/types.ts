export type WorkspaceImage = {
   id: string;
   url: string;
   alt?: string;
   isPrimary?: boolean; // Главное фото для превью
};

export type Workspace = {
   // Основные данные
   id: number;
   location: string;
   title: string;
   provider: string;
   coords: [number, number];
   price: string;
   description: string;

   // Фильтруемые свойства
   type: string;
   capacity?: string | string[] | number;
   amenities: string[];

   // Варианты для фильтров (если должны приходить с бэкенда)
   filterOptions?: {
      type: Array<{ value: string; label: string }>;
      capacity: Array<{ value: string; label: string }>;
      amenities: Array<{ value: string; label: string }>;
   };

   // Добавляем поле для изображений
   images: WorkspaceImage[]; // Массив объектов с изображениями

   // Дополнительное поле для превью
   thumbnail?: string; // Ссылка на основное изображение
};

// Пример данных
export const workspaces: Workspace[] = [
   {
      id: 1,
      location: "Москва",
      title: "Коворкинг «Бизнес Хаб»",
      provider: "Business Hub Co",
      coords: [55.753215, 37.622504], // Москва, центр
      price: "От 900 ₽/час",
      description:
         "Современный коворкинг в центре Москвы с отличной инфраструктурой для бизнеса любого масштаба. Идеальное место для стартапов и компаний, ценящих комфорт и технологичность.",
      type: "Приватный офис",
      capacity: "4-6",
      amenities: ["wifi", "printer", "coffee", "parking", "conference-rooms"],
      filterOptions: {
         type: [
            { value: "private-office", label: "Приватный офис" },
            { value: "meeting-room", label: "Переговорная" },
         ],
         capacity: [
            { value: "1-3", label: "1-3 человека" },
            { value: "4-6", label: "4-6 человек" },
         ],
         amenities: [
            { value: "wifi", label: "Wi-Fi" },
            { value: "printer", label: "Принтер" },
         ],
      },
      images: [
         {
            id: "1",
            url: "https://i.pinimg.com/736x/b3/b6/33/b3b63323b67235e6fe39619b23259cc3.jpg",
            isPrimary: true, // Главное изображение
         },
         {
            id: "2",
            url: "https://i.pinimg.com/736x/c8/b6/33/c8b6337757992b2d470611736191923c.jpg",
         },
      ],
   },
   {
      id: 2,
      location: "Санкт-Петербург",
      title: "PARTA",
      provider: "PARTA",
      coords: [59.93428, 30.335098], // Санкт-Петербург
      price: "750 ₽/час (дневной тариф)",
      description:
         "Уютное пространство для творческих профессионалов с атмосферой, вдохновляющей на новые идеи. Отличный выбор для дизайнеров, разработчиков и креативных команд.",
      type: "Коворкинг",
      capacity: "1-3",
      amenities: ["wifi", "coffee", "kitchen", "event-space"],
      filterOptions: {
         type: [
            { value: "coworking", label: "Коворкинг" },
            { value: "hot-desk", label: "Горячее место" },
         ],
         capacity: [{ value: "1-3", label: "1-3 человека" }],
         amenities: [
            { value: "event-space", label: "Площадка для мероприятий" },
         ],
      },
      images: [
         {
            id: "1",
            url: "https://www.kovorkingi.ru/data/files/img/std/1000000/10000/9671-parta-1d306e3b6f3d_959x720.webp",
            isPrimary: true,
         },
         {
            id: "2",
            url: "https://i.pinimg.com/736x/b3/b6/33/b3b63323b67235e6fe39619b23259cc3.jpg",
         },
         {
            id: "3",
            url: "https://www.kovorkingi.ru/data/files/img/std/1000000/10000/9684-severnaya-dolina-begovaya-61d31ba2a094.jpg",
         },
         {
            id: "4",
            url: "https://www.kovorkingi.ru/data/files/img/std/1000000/10000/9670-parta-336c2f28e1c8.jpg",
         },
         {
            id: "5",
            url: "https://www.kovorkingi.ru/data/files/img/std/1000000/10000/9672-parta-fdbdff155257_959x720.webp",
         },
      ],
   },
   {
      id: 3,
      location: "Москва",
      title: "Офис на Тверской",
      provider: "Premium Offices",
      coords: [55.764214, 37.612513], // Москва, Тверская
      price: "1500 ₽/час (VIP-зал)",
      description:
         "Премиальные переговорные комнаты в самом сердце Москвы. Идеальное решение для важных встреч и презентаций.",
      type: "Переговорная",
      capacity: "7+",
      amenities: ["wifi", "projector", "whiteboard", "catering"],
      filterOptions: {
         type: [{ value: "meeting-room", label: "Переговорная" }],
         capacity: [{ value: "7+", label: "7+ человек" }],
         amenities: [{ value: "projector", label: "Проектор" }],
      },
      images: [
         {
            id: "1",
            url: "https://i.pinimg.com/736x/b3/b6/33/b3b63323b67235e6fe39619b23259cc3.jpg",
            isPrimary: true, // Главное изображение
         },
         {
            id: "2",
            url: "https://i.pinimg.com/736x/c8/b6/33/c8b6337757992b2d470611736191923c.jpg",
         },
      ],
   },
   {
      id: 4,
      location: "Москва",
      title: "IT Loft",
      provider: "Tech Spaces",
      coords: [55.727024, 37.568965], // Москва, Дубровка
      price: "500 ₽/час (ночные скидки)",
      description:
         "Коворкинг для IT-специалистов с круглосуточным доступом. Полностью оборудованные рабочие места и зоны отдыха.",
      type: "Коворкинг",
      capacity: "1-3",
      amenities: ["wifi", "coffee", "24/7", "phone-booths"],
      filterOptions: {
         type: [{ value: "coworking", label: "Коворкинг" }],
         capacity: [{ value: "1-3", label: "1-3 человека" }],
         amenities: [{ value: "24/7", label: "Круглосуточно" }],
      },
      images: [
         {
            id: "1",
            url: "https://i.pinimg.com/736x/c8/b6/33/c8b6337757992b2d470611736191923c.jpg",
            isPrimary: true, // Главное изображение
         },
         {
            id: "2",
            url: "https://i.pinimg.com/736x/b3/b6/33/b3b63323b67235e6fe39619b23259cc3.jpg",
         },
      ],
   },
   {
      id: 5,
      location: "Санкт-Петербург",
      title: "Бизнес-центр «Нева»",
      provider: "Neva Business",
      coords: [59.925841, 30.317246], // СПб, Невский пр.
      price: "2000 ₽/день",
      description:
         "Респектабельный бизнес-центр класса А с полным спектром услуг для комфортной работы. Видовые офисы с панорамными окнами.",
      type: "Приватный офис",
      capacity: "4-6",
      amenities: ["wifi", "parking", "reception", "cleaning"],
      filterOptions: {
         type: [{ value: "private-office", label: "Приватный офис" }],
         capacity: [{ value: "4-6", label: "4-6 человек" }],
         amenities: [{ value: "cleaning", label: "Уборка" }],
      },
      images: [
         {
            id: "1",
            url: "https://i.pinimg.com/736x/b3/b6/33/b3b63323b67235e6fe39619b23259cc3.jpg",
            isPrimary: true, // Главное изображение
         },
         {
            id: "2",
            url: "https://i.pinimg.com/736x/c8/b6/33/c8b6337757992b2d470611736191923c.jpg",
         },
      ],
   },
];
