import Hero from "components/Hero/Hero";
import { BackgroundHero } from "./MainPage.styled";
import { PreviewCategories } from "components/PreviewCategories/PreviewCategories";

const WelcomePage = () => {
  return (
    <main>
      <BackgroundHero>
        <Hero />
        <PreviewCategories />
      </BackgroundHero>
    </main>
  );
};
export default WelcomePage;
