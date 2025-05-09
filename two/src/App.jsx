import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({ A: '', B: '', C: '' })
  const [explicit, setExplicit] = useState({ A: false, B: false, C: false })

  useEffect(() => {
    fetch('/testData.txt')
      .then(r => r.text())
      .then(txt => {
        const parsed = txt.trim().split('\n').map(line => {
          const [A, B, C] = line.split(',')
          return { A, B, C }
        })
        
        setData(parsed)
      })
  }, [])

  const filteredRows = data.filter(
    ({ A, B, C }) =>
      (!filters.A || A === filters.A) &&
      (!filters.B || B === filters.B) &&
      (!filters.C || C === filters.C)
  )

  const order = ['A', 'B', 'C']

  const dynamicOptions = order.reduce((o, key, idx) => {
    const subset = data.filter(row =>
      order.slice(0, idx).every(
        k => !explicit[k] || !filters[k] || row[k] === filters[k]
      )
    )
    o[key] = Array.from(new Set(subset.map(r => r[key])))
    
    return o
  }, {})

  const recomputeOptions = f =>
    order.reduce((o, k) => {
      o[k] = Array.from(new Set(data.filter(r =>
        (!f.A || r.A === f.A) &&
        (!f.B || r.B === f.B) &&
        (!f.C || r.C === f.C)
      ).map(r => r[k])))
      return o
    }, {})

  const handleSelect = e => {
    const key = e.target.id
    const value = e.target.value

    if (value === '') {
      setFilters({ A: '', B: '', C: '' })
      setExplicit({ A: false, B: false, C: false })
      return
    }

    const nextFilters = { ...filters, [key]: value }
    const nextExplicit = { ...explicit, [key]: true }

    let newOptions = recomputeOptions(nextFilters)

    order.forEach(k => {
      if (
        k !== key &&
        nextFilters[k] &&
        !newOptions[k].includes(nextFilters[k])
      ) {
        nextFilters[k] = ''
        nextExplicit[k] = false
      }
    })

    newOptions = recomputeOptions(nextFilters)

    order.forEach(k => {
      if (!nextFilters[k] && newOptions[k].length === 1) {
        nextFilters[k] = newOptions[k][0]
        nextExplicit[k] = false
      }
    })

    setFilters(nextFilters)
    setExplicit(nextExplicit)
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
