import React from 'react'
import * as alphabet from 'alphabet'

import '../scss/components/data-table.scss'

const TableHeader = ({ isTransposed, transpose, headers, data }) => {
  const colCount = isTransposed ? data.length + 1 : headers.length
  const colIndex = Array.from(Array(colCount).keys())
  const colHeader = colIndex.map(i => alphabet.upper[i])

  return (
    <thead>
      <tr>
        <th className="data-table__transpose">
          <button onClick={transpose}>⤭</button>
        </th>
        {colHeader.map(i => <th key={i}>{i}</th>)}
      </tr>
    </thead>
  )
}

const TableBody = ({ isTransposed, ...props }) =>
  isTransposed ? TableBodyHorizontal(props) : TableBodyVertical(props)

const TableBodyHorizontal = ({ headers, data }) => (
  <tbody>
    {headers.map(({ label, key, type }, index) => (
      <tr>
        <th>{index + 1}</th>
        <th className="data-table__cell--string">{label}</th>
        {data.map(row => (
          <td className={`data-table__cell--${type}`} key={row[key]}>
            {row[key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
)

const TableBodyVertical = ({ headers, data }) => (
  <tbody>
    <tr>
      <th>1</th>
      {headers.map(({ label, key, type }) => (
        <th className={`data-table__cell--${type}`} key={key}>
          {label}
        </th>
      ))}
    </tr>
    {data.map((row, index) => (
      <tr key={index}>
        <th>{index + 2}</th>
        {headers.map(({ label, key, type }) => (
          <td className={`data-table__cell--${type}`}>{row[key]}</td>
        ))}
      </tr>
    ))}
  </tbody>
)

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isTransposed: false }
    this.transpose = this.transpose.bind(this)
  }

  transpose() {
    this.setState(prevState => ({
      isTransposed: !prevState.isTransposed
    }))
  }

  render() {
    const { isTransposed } = this.state
    const { data, headers } = this.props

    return (
      <div className="data-table">
        <div className="data-table__container">
          <table>
            <TableHeader
              transpose={this.transpose}
              isTransposed={isTransposed}
              headers={headers}
              data={data}
            />
            <TableBody
              isTransposed={isTransposed}
              headers={headers}
              data={data}
            />
          </table>
        </div>
      </div>
    )
  }
}

export default DataTable
