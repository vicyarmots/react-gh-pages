import React, {Component} from 'react'
import './style.css';

const useSortableData = (items, config = null) => {

  
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ArtistTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.artists);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div className="wrapper">
      <div className="content">
      <table>
      <caption>
      <h2>My TOP favorite artist</h2>
      </caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('year')}
              className={getClassNamesFor('year')}
            >
              Year
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('genre')}
              className={getClassNamesFor('genre')}
            >
              Genre
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.year}</td>
            <td>{item.genre}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <ArtistTable
        artists={[
        { id: 1, name: 'Machine Gun Kelly', year: 2012, genre: 'rap' },
        { id: 2, name: 'Imagine Dragons', year: 2014, genre: 'indi' },
        { id: 3, name: 'Linkin Park', year: 2001, genre: 'rock' },
        { id: 4, name: 'Bastille', year: 2010 , genre: 'indi-pop' },
        { id: 5, name: 'Travis Scott', year: 2018, genre: 'hiphop' },
        { id: 6, name: 'The Weeknd', year: 2016, genre: '‎r&b' },
        { id: 7, name: 'XXXTentacion', year: 2017, genre: 'rap' },
        { id: 8, name: 'Pop Smoke', year: 2020, genre: 'drill' },
        { id: 9, name: 'Bullet for My Valentine', year: 2003, genre: 'metalcore' },
        { id: 10, name: 'Asking Alexandria', year: 2009 , genre: 'rock' },
        { id: 11, name: 'My Chemical Romance', year: 2013, genre: 'postrock' },
        { id: 12, name: 'Papa Roach', year: 2017, genre: 'rock' },
        { id: 13, name: 'Placebo', year: 2011, genre: 'indi-rock' },
        { id: 14, name: 'Cigarettes After Sex', year: 2015, genre: 'indi' },
        { id: 15, name: 'The Neighbourhood', year: 2018, genre: 'indi-rock' },
       ]}
      />
    </div>
  );
}

