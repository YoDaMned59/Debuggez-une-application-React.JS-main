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
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const jsonData = await api.loadData();
      setData(jsonData);

      const mostRecentEvent = jsonData.events
      .filter(event => event.date)
      .reduce((latest, current) => {
        const currentDate = new Date(current.date);
        const latestDate = new Date(latest.date);
        return currentDate > latestDate ? current : latest;
      });

    setLast(mostRecentEvent);
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
