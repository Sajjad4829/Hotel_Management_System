import { usePageContext } from "../../Context/PageContext";
import { componentRegistry } from "../../Registry/ComponentRegistry";

const Home = () => {
    const { pagesData } = usePageContext();
    const homeData = pagesData.home || {};
    const layout = homeData.layout || [];

    return (
        <div>
            {layout.map((sectionId) => {
                const Component = componentRegistry[sectionId];
                if (!Component) return null;
                
                // Pass section-specific data as props
                const sectionData = homeData[sectionId] || {};
                return <Component key={sectionId} data={sectionData} />;
            })}
        </div>
    );
};

export default Home;