// data/categoriesData.js

const data = [
    {
      id: 1,
      name: "Cranes",
      subcategories: [
        {
          id: 1,
          name: "Mobile Cranes",
          products: [
            { id: 1, name: "Liebherr LTM 1200-5.1", description: "Mobile crane with a lifting capacity of 200 tons", price: "Contact us" },
            { id: 2, name: "Terex AC 40/2L", description: "Compact mobile crane ideal for tight spaces", price: "Contact us" },
            { id: 3, name: "Grove GMK 4100L", description: "4-axle crane with a maximum lifting capacity of 100 tons", price: "Contact us" }
          ]
        },
        {
          id: 2,
          name: "Tower Cranes",
          products: [
            { id: 4, name: "Potain MDT 489", description: "High-performance tower crane with a lifting capacity of up to 18 tons", price: "Contact us" },
            { id: 5, name: "Liebherr 500 EC-B 125", description: "Compact and efficient tower crane for urban sites", price: "Contact us" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Excavators",
      subcategories: [
        {
          id: 1,
          name: "Mini Excavators",
          products: [
            { id: 6, name: "Kubota KX 080-4", description: "Mini excavator with a powerful engine and compact design", price: "Contact us" },
            { id: 7, name: "Takeuchi TB 295 W", description: "Hydraulic mini excavator with rubber tracks", price: "Contact us" }
          ]
        },
        {
          id: 2,
          name: "Crawler Excavators",
          products: [
            { id: 8, name: "Caterpillar 320", description: "Hydraulic excavator with a high-performance engine", price: "Contact us" },
            { id: 9, name: "Volvo EC950F Crawler", description: "Powerful excavator for heavy-duty operations", price: "Contact us" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Vehicles",
      subcategories: [
        {
          id: 1,
          name: "Trucks",
          products: [
            { id: 10, name: "Mercedes-Benz Actros", description: "Heavy-duty truck ideal for transportation", price: "Contact us" },
            { id: 11, name: "Volvo FH16", description: "High-capacity truck for long-haul transport", price: "Contact us" }
          ]
        },
        {
          id: 2,
          name: "Pick-up Trucks",
          products: [
            { id: 12, name: "Toyota Hilux", description: "Durable and rugged pick-up truck", price: "Contact us" },
            { id: 13, name: "Ford Ranger", description: "Strong and reliable 4x4 pick-up truck", price: "Contact us" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Earthmoving Equipment",
      subcategories: [
        {
          id: 1,
          name: "Loaders",
          products: [
            { id: 14, name: "Caterpillar 962M", description: "Wheel loader for construction and mining", price: "Contact us" },
            { id: 15, name: "Volvo L150H", description: "Large wheel loader with great lifting capacity", price: "Contact us" }
          ]
        },
        {
          id: 2,
          name: "Bulldozers",
          products: [
            { id: 16, name: "Caterpillar D6", description: "Bulldozer for heavy construction projects", price: "Contact us" },
            { id: 17, name: "Komatsu D65", description: "Powerful bulldozer with great traction", price: "Contact us" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Generators",
      subcategories: [
        {
          id: 1,
          name: "Diesel Generators",
          products: [
            { id: 18, name: "Cummins C300D5", description: "Diesel generator with 300 kVA output", price: "Contact us" },
            { id: 19, name: "Atlas Copco QAS 60", description: "Portable diesel generator for various applications", price: "Contact us" }
          ]
        },
        {
          id: 2,
          name: "Electric Generators",
          products: [
            { id: 20, name: "Honda EG 5000", description: "Electric generator for smaller projects", price: "Contact us" },
            { id: 21, name: "Honda EU22i", description: "Quiet and efficient electric generator", price: "Contact us" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Lifting Equipment",
      subcategories: [
        {
          id: 1,
          name: "Forklifts",
          products: [
            { id: 22, name: "Jungheinrich EFG 216", description: "Electric forklift for indoor and outdoor use", price: "Contact us" },
            { id: 23, name: "Toyota 8FBET15", description: "Compact electric forklift with high performance", price: "Contact us" }
          ]
        },
        {
          id: 2,
          name: "Lifting Platforms",
          products: [
            { id: 24, name: "Genie Z-45/25J", description: "Articulating lift for high access jobs", price: "Contact us" },
            { id: 25, name: "Haulotte HA12 IP", description: "Electric-powered articulated platform", price: "Contact us" }
          ]
        }
      ]
    }
  ];
  
  export default data;
  