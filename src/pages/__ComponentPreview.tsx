import ShopThisList from "@/components/ShopThisList";
import morningBreakfastTulips from "@/assets/gallery/morning-breakfast-tulips.jpg.asset.json";
import quinoaLunch from "@/assets/gallery/quinoa-lunch.jpg.asset.json";
import gumboAtTrikki from "@/assets/gallery/gumbo-at-trikki.jpg.asset.json";
import parkSpringPlanting from "@/assets/gallery/park-spring-planting.jpg.asset.json";
import hotelAtlanticoBlueHour from "@/assets/gallery/hotel-atlantico-blue-hour.jpg.asset.json";
import metropolisCrosswalk from "@/assets/gallery/metropolis-crosswalk.jpg.asset.json";

const ITEMS = [
  {
    photo: morningBreakfastTulips,
    name: "Ceramic breakfast plate",
    why: "The blue plate I use every morning.",
    link: "https://example.com/plate",
  },
  {
    photo: quinoaLunch,
    name: "Glass food container",
    why: "Keeps salad dressed for two days.",
    link: "https://example.com/container",
  },
  {
    photo: gumboAtTrikki,
    name: "Deep cereal bowl",
    why: "Right size for soup and rice.",
    link: "https://example.com/bowl",
  },
  {
    photo: parkSpringPlanting,
    name: "Watering can",
    why: "Small enough for a balcony.",
    link: "https://example.com/can",
  },
  {
    photo: hotelAtlanticoBlueHour,
    name: "Packable day bag",
    why: "Fits under a plane seat.",
    link: "https://example.com/bag",
  },
  {
    photo: metropolisCrosswalk,
    name: "Compact umbrella",
    why: "Survived every Madrid downpour.",
    link: "https://example.com/umbrella",
  },
];

const ComponentPreview = () => (
  <main className="mx-auto max-w-6xl px-6 py-10">
    <ShopThisList
      eyebrow="Kit"
      heading="Shop This List"
      subheading="Everything below is something I actually use."
      items={ITEMS}
      desktopColumns={4}
    />
  </main>
);

export default ComponentPreview;
