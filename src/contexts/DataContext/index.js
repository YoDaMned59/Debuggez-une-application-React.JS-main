import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); // création de la variable "last" 

  const getData = useCallback(async () => {
    try {
      const jsonData = await api.loadData();
      setData(jsonData); //
      const lastEvent = jsonData.events[jsonData.events.length - 1];
      setLast(lastEvent); // ajout de la dernière prestation
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
   
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
