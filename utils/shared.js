const basicRoutes = {
    client: [
        {
            title: "Cuentas",
            path: "/client/Accounts",
            id: 1
        },
        {
            title: "Préstamos",
            path: "/client/Loans",
            id: 2
        },
        {
            title: "Tarjetas de Crédito",
            path: "/client/CreditCard",
            id: 3
        },
        {
            title: "Ahorro a Plazo Fijo",
            path: "/client/Investment",
            id: 4
        },
        {
            title: "Giros",
            path: "/Transfer",
            id: 5
        }
    ],
    pyme: [
        {
            title: "Cuentas",
            path: "/pyme/Accounts",
            id: 1
        },
        {
            title: "Préstamos",
            path: "/pyme/Loans",
            id: 2
        },
        {
            title: "Comex",
            path: "/pyme/Comex",
            id: 3
        },
        {
            title: "Servicios",
            path: "/pyme/Services",
            id: 4
        },
        {
            title: "Boletas de Garantia",
            path: "/companies/Guarantee",
            id: 5
        },
        {
            title: "Giros",
            path: "/Transfer",
            id: 6
        },
    ],
    companies: [
        {
            title: "Cuentas",
            path: "/companies/Accounts",
            id: 1
        },
        {
            title: "Préstamos",
            path: "/companies/Loans",
            id: 2
        },
        {
            title: "Comex",
            path: "/companies/Comex",
            id: 3
        },
        {
            title: "Servicios",
            path: "/companies/Services",
            id: 4
        },
        {
            title: "Boletas de Garantia",
            path: "/companies/Guarantee",
            id: 5
        },
        {
            title: "Giros",
            path: "/Transfer",
            id: 6
        },
    ],
    banx: [
        {
            title: "Cuentas",
            path: "/banx/AccountsBanx",
            id: 1
        },
        {
            title: "Préstamos",
            path: "/banx/Loans",
            id: 2
        },
        {
            title: "Tarjetas de Crédito",
            path: "/banx/creditCard",
            id: 3
        },
        {
            title: "Promo BANX",
            path: "/banx/deal",
            id: 4
        }
    ]
};

export const headerItems = [
    {
        category: "Personas",
        path: "/",
        subCategories: [
            {
                title: "Plan Familia",
                path: process.env.REDIRECT_FAMILY,
                id: 9
            },
            ...basicRoutes.client,
            {
                title: "Seguros",
                path: "/client/Insurance",
                id: 6
            },
            {
                title: "Banca 24/7",
                path: "/tech",
                id: 7
            },
            {
                title: "Contáctanos",
                path: "/help",
                id: 8
            }
        ],
        id: 1
    },
    {
        category: "PYME",
        path: "/Pyme",
        subCategories: [
            ...basicRoutes.pyme,
            {
                title: "Seguros",
                path: "/pyme/Insurance",
                id: 8
            },
            {
                title: "Banca 24/7",
                path: "/tech",
                id: 9
            },
            {
                title: "Contáctanos",
                path: "/help",
                id: 10
            }
        ],
        id: 2
    },
    {
        category: "Empresas",
        path: "/companies",
        subCategories: [
            ...basicRoutes.companies,
            {
                title: "Seguros",
                path: "/companies/Insurance",
                id: 8
            },
            {
                title: "Banca 24/7",
                path: "/tech",
                id: 9
            },
            {
                title: "Contáctanos",
                path: "/help",
                id: 10
            }
        ],
        id: 3
    },
    {
        category: "BANX",
        path: "/Banx",
        subCategories: [
            ...basicRoutes.banx,
            {
                title: "Seguros",
                path: "/banx/Insurance",
                id: 5
            },
            {
                title: "Banca 24/7",
                path: "/tech",
                id: 6
            },
            {
                title: "Contáctanos",
                path: "/help",
                id: 7
            }
        ],
        id: 4
    }
];

export const headerMobileItems = [
    {
        category: "Personas",
        path: "/",
        subCategories: [
            {
              title: "Inicio",
              path: "/",
              id: 0
            },
            {
                title: "Plan Familia",
                path: process.env.REDIRECT_FAMILY,
                id: 7
            },
            ...basicRoutes.client,
            {
                title: "Seguros",
                path: "/client/Insurance",
                id: 6
            }

        ],
        id: 1
    },
    {
        category: "PYME",
        path: "/Pyme",
        subCategories: [
            {
                title: "Inicio",
                path: "/pyme",
                id: 0
            },
            ...basicRoutes.pyme,
            {
                title: "Seguros",
                path: "/pyme/Insurance",
                id: 6
            }
        ],
        id: 2
    },
    {
        category: "Empresas",
        path: "/companies",
        subCategories: [
            {
                title: "Inicio",
                path: "/companies",
                id: 0
            },
            ...basicRoutes.companies,
            {
                title: "Seguros",
                path: "/companies/Insurance",
                id: 5
            }
        ],
        id: 3
    },
    {
        category: "BANX",
        path: "/Banx",
        subCategories: [
            {
              title: "Inicio",
              path: "/Banx",
              id: 0
            },
            ...basicRoutes.banx,
            {
              title: "Seguros",
              path: "/Banx/Insurance",
              id: 0
            },
        ],
        id: 4
    }
];

export const additionalHeaderItems = [
    {
        category: "Banca 24/7",
        path: "/tech",
        id: 5
    },
    {
        category: "Contáctanos",
        path: "/help",
        id: 6
    },
]
