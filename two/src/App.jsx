import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [data, setData] = useState([])
  const [originalOptions, setOriginalOptions] = useState({ A: [], B: [], C: [] })
  const [filters, setFilters] = useState({ A: '', B: '', C: '' })
  const [lastChanged, setLastChanged] = useState(null)

  useEffect(() => {
    fetch('/testData.txt')
      .then(r => r.text())
      .then(txt => {
        const parsed = txt.trim().split('\n').map(line => {
          const [A, B, C] = line.split(',')
          return { A, B, C }
        })
        
        setData(parsed)

        const full = ['A', 'B', 'C'].reduce((o, key) => {
          o[key] = Array.from(new Set(parsed.map(r => r[key])))
          return o
        }, {})

        setOriginalOptions(full)
      })
  }, [])

  const filteredRows = data.filter(
    ({ A, B, C }) =>
      (!filters.A || A === filters.A) &&
      (!filters.B || B === filters.B) &&
      (!filters.C || C === filters.C)
  )

  const order = ['A', 'B', 'C']

  const dynamicOptions = order.reduce((o, key) => {
    if (
      lastChanged === null ||
      order.indexOf(key) <= order.indexOf(lastChanged)
    ) {
      o[key] = originalOptions[key] || []
    } else {
      o[key] = Array.from(new Set(filteredRows.map(r => r[key])))
    }

    return o
  }, {})

  const handleSelect = e => {
    const key = e.target.id.slice(-1)
    const value = e.target.value

    if (value === '') {
      setFilters({ A: '', B: '', C: '' })
      setLastChanged(null)
      return
    }

    const nextFilters = { ...filters, [key]: value }
    const remaining = data.filter(
      ({ A, B, C }) =>
        (!nextFilters.A || A === nextFilters.A) &&
        (!nextFilters.B || B === nextFilters.B) &&
        (!nextFilters.C || C === nextFilters.C)
    )

    const newOptions = order.reduce((o, k) => {
      o[k] = Array.from(new Set(remaining.map(r => r[k])))
      return o
    }, {})

    order
      .filter(k => k !== key)
      .forEach(k => {
        if (!nextFilters[k] && newOptions[k].length === 1) {
          nextFilters[k] = newOptions[k][0]
        }
      })

    setFilters(nextFilters)
    setLastChanged(key)
  }

  return (
    <div>
      <div className='header-container'>
        {order.map(key => (
          <label key={key} style={{ marginRight: 24 }}>
            {key}:
            <select
              id={key}
              value={filters[key]}
              onChange={handleSelect}
              style={{ marginLeft: 8 }}
            >
              {dynamicOptions[key]?.length > 1 && <option value="">Toate</option>}
              {dynamicOptions[key]?.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((r, i) => (
            <tr key={i}>
              <td>{r.A}</td>
              <td>{r.B}</td>
              <td>{r.C}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
