import React from 'react'
import { useRouter } from 'next/router'
import {Row , Col} from 'antd'
import { Paths } from '../utils/dummyData'
import Link from 'next/link'

const PathsSection = () => {
  
  return (
    <>
      
        <div className="container">
          <Row gutter={[16, 16]}>
            {Paths.map((path) => (
              <div key={path.id} className="col-lg-4 col-md-6 col-sm-12">
                <Link href='/path'>
                  <div
                    className="card p-4 m-2"
                    style={{ alignItems: "center", cursor: "pointer", borderRadius: "10px" }}
                  >
                    <h6 className="card-title m-2"> {path.title} </h6>
                  </div>
                </Link>
              </div>
            ))}
          </Row>
        </div>
      
    </>
  )
}

export default PathsSection