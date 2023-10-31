import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import {
  ButtonsList,
  ButtonCategory,
  ScrollableContainer,
} from "./Categories.styled";
import { PagesWrapper } from "../../components/PagesWrapper/PagesWrapper";
import { Pagination } from "../../components/Pagination/Pagination";
import { MainPageTitle } from "../../components/MainPageTitle/MainPageTitle";
import { ErrorImageContainer } from "../../components/ErrorImageContainer/ErrorImageContainer";
import { RecipesList } from "../../components/RecipesList/RecipesList";

const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [menuList, setMenuList] = useState([]);
  const [category, setCategory] = useState(categoryName || "Beef");
  const [categoriesList, setCategoriesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPage] = useState(1);
  const activeRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchCategory = async (category) => {
    setLoading(true);
    setCategoriesList([]);
    try {
      const response = await axios.get(
        `https://soyummy-tw3y.onrender.com/api/v1/recipes/category/${category}`
      );

      const { data } = response.data;

      setCategoriesList(data);

      if (response) {
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setCategoriesList([]);
      console.log(error);
    }
  };

  const searchMenuList = async () => {
    const results = await axios.get(
      `https://soyummy-tw3y.onrender.com/api/v1/recipes/category-list`
    );
    const { data } = results.data;

    setMenuList(data);
  };

  const handleScrollbar = () => {
    const elList = activeRef.current;
    const el = elList.querySelector(".active");
    if (el) {
      el.scrollIntoView({
        block: "end",
      });
    }
  };

  useEffect(() => {
    if (pageNumber === 1) {
      setSearchParams({ ...searchParams, page: 1 });
    }
  }, [pageNumber, searchParams, setSearchParams]);

  useEffect(() => {
    searchMenuList();
  }, []);

  useEffect(() => {
    handleScrollbar();
  }, [menuList]);

  useEffect(() => {
    setPage(1);
    searchCategory(category);
  }, [category]);

  useEffect(() => {
    if (
      searchParams.has("page") &&
      parseInt(searchParams.get("page")) !== pageNumber
    ) {
      searchParams.set("page", pageNumber);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  }, [setSearchParams, navigate, location, pageNumber, searchParams]);

  const totalPages =
    categoriesList.length > 0 ? Math.ceil(categoriesList.length / 8) : 0;

  const perPage = 8;
  const lastIndex = perPage * pageNumber;
  const startIndex = lastIndex - perPage;
  const renderList = categoriesList.slice(startIndex, lastIndex);

  const handlePageChange = (id) => {
    setPage(id);
  };

  const handlePageChangeDecrement = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePageChangeIncrement = () => {
    setPage((prevState) => prevState - 1);
  };

  return (
    <main>
      <PagesWrapper>
        <MainPageTitle title="Categories" />

        <ScrollableContainer
          options={{
            suppressScrollX: false,
            suppressScrollY: true,
          }}
        >
          <ButtonsList ref={activeRef}>
            {menuList.map((item) => {
              return (
                <li key={item}>
                  <ButtonCategory
                    to={`/categories/${item}`}
                    onClick={() => {
                      setCategory(item);
                    }}
                  >
                    {item}
                  </ButtonCategory>
                </li>
              );
            })}
          </ButtonsList>
        </ScrollableContainer>

        {error && !loading && (
          <ErrorImageContainer title="Doesn't find any recipes..." />
        )}
        {!error && loading && <Loader />}
        {renderList.length > 0 && <RecipesList list={renderList} />}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            onSelectPage={handlePageChange}
            onArrowLeftClick={handlePageChangeDecrement}
            onArrowRightClick={handlePageChangeIncrement}
          />
        )}
      </PagesWrapper>
    </main>
  );
};

export default Categories;
