import React, { useState } from 'react'

const teamData = {
  Bills: {
    winTotal: 10.5,
    playoffOdds: '+120',
    logo: '/logos/bills.png',
    lastYear: '11-6, lost Divisional Round',
    offseason: 'Added WR depth, re-signed key defenders.'
  },
  Dolphins: {
    winTotal: 9.5,
    playoffOdds: '+150',
    logo: '/logos/dolphins.png',
    lastYear: '11-6, lost Wild Card Round',
    offseason: 'Signed OL help, bolstered secondary.'
  }
}

const divisions = {
  'AFC East': ['Bills', 'Dolphins']
}

export default function NFLPredictionsApp() {
  const [players, setPlayers] = useState(Array(6).fill(''))
  const [picks, setPicks] = useState({})

  const handleNameChange = (index, name) => {
    const updated = [...players]
    updated[index] = name
    setPlayers(updated)
  }

  const handlePick = (player, team, value) => {
    setPicks(prev => ({
      ...prev,
      [player]: {
        ...prev[player],
        [team]: value
      }
    }))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>NFL Predictions (Simmons & Sal Style)</h1>

      <div>
        <h2>Enter Player Names</h2>
        {players.map((name, i) => (
          <input
            key={i}
            placeholder={`Player ${i + 1} Name`}
            value={name}
            onChange={e => handleNameChange(i, e.target.value)}
          />
        ))}
      </div>

      {Object.entries(divisions).map(([division, teams]) => (
        <div key={division} style={{ marginTop: '20px' }}>
          <h2>{division}</h2>
          {teams.map(team => (
            <div key={team} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <img src={teamData[team].logo} alt={team} style={{ width: '50px' }} />
              <h3>{team}</h3>
              <p>Win Total: {teamData[team].winTotal}</p>
              <p>Playoff Odds: {teamData[team].playoffOdds}</p>
              <p>{teamData[team].lastYear}</p>
              <p>{teamData[team].offseason}</p>

              {players.filter(p => p).map(player => (
                <div key={player}>
                  <label>{player}'s Pick</label>

                  <select onChange={e => handlePick(player, team, e.target.value)}>
                    <option value="">Select</option>

                    <option value="Over">Over</option>

                    <option value="Under">Under</option>

                  </select>

                </div>

              ))}
            </div>

          ))}
        </div>

      ))}
    </div>

  )
}
