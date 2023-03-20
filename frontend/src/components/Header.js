import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query categories {
    categories {
      data{
        id
        attributes{
          name
        }
      }
    }
  }
`

function Header() {
  const { loading, error, data } = useQuery(CATEGORIES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching categories.</p>;

  return (
    <div className="site-header">
      <span>LOGO</span>
      <Link to="/">
        <h1>DOBU Blogposts</h1>
      </Link>
      <nav className="categories">
        <span>categories:</span>
        {/* {console.log(data)} */}
        {data.categories.data.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`}>
            {cat.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Header;
