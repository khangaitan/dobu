import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

// timestamp libs start
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.setDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const POST = gql`
  query getPost($id: ID!) {
    blogpost(id: $id) {
      data {
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

export default function PostDetail() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(POST, { variables: { id } })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Whoops, someting went wrong.</p>;


  const post = data.blogpost.data
  return (<>
    <h2>Thread</h2>
    <div className="review-card">
      <div className="rating"></div>
      <h2>{post.attributes.title}</h2>
      <small>{timeAgo.format(Date.parse(post.attributes.createdAt))}</small>
      {post.attributes.categories.data
        && post.attributes.categories.data.map(cat => (
          <button key={cat.id}>{cat.attributes.name}</button>
        ))
      }
      <ReactMarkdown>{post.attributes.body}</ReactMarkdown>
    </div>
  </>)
}
