import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// timestamp lib start
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
// timestamp lib end


const POSTS = gql`
  query getPosts {
    blogposts{
      data{
        id
        attributes {
          title
          body
          createdAt
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }`


function Home() {
  const { loading, error, data } = useQuery(POSTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Whoops, someting went wrong.</p>;

  return (
    <div>
      <h2>Newsfeed</h2>
      {data.blogposts.data.map(item => (
        <div key={item.id} className="review-card">
          <div className="rating"></div>
          <h2>{item.attributes.title}</h2>
          <small>{timeAgo.format(Date.parse(item.attributes.createdAt))}</small>
          {item.attributes.categories.data
            && item.attributes.categories.data.map(cat => (
              <button key={cat.id}>{cat.attributes.name}</button>
            ))
          }
          <p>{item.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${item.id}`}>Show this thread</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
