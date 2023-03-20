import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// timestamp lib start
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
// timestamp lib end

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          blogposts{
            data {
              id
              attributes {
                createdAt
                title
                body
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
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, { variables: { id: id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>


  const posts = data.category.data.attributes.blogposts
  return (
    <div>
      <h2>{data.category.data.attributes.name}</h2>
      {posts.data.map(item => (
        <div key={item.id} className="review-card">
          <div className="rating"></div>

          <h2>{item.attributes.title}</h2>
          <small>{timeAgo.format(Date.parse(item.attributes.createdAt))}</small>
          {item.attributes.categories.data.map(cat => (
            <button key={cat.id}>{cat.attributes.name}</button>
          ))}
          <ReactMarkdown>{item.attributes.body.toString().substring(0, 200)}</ReactMarkdown>
          <Link to={`/details/${item.id}`}>Show this thread</Link>
        </div>
      ))}
    </div>
  )
}
