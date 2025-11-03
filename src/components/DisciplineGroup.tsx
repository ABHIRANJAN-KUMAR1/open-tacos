import { useEffect } from 'react'
import { ClimbDisciplineRecord } from '../js/types'
import TableView from './ui/TableView'
import Toggle from './ui/Toggle'

interface DisciplineGroupProps {
  defaultTypes: Partial<ClimbDisciplineRecord>
  climbTypes: Partial<ClimbDisciplineRecord>
  setClimbTypes: React.Dispatch<React.SetStateAction<Partial<ClimbDisciplineRecord>>>
}

const DisciplineGroup = ({ climbTypes, setClimbTypes, defaultTypes }: DisciplineGroupProps): JSX.Element => {
  useEffect(() => {
    // Merge defaults without overwriting user selections
    setClimbTypes(prev => ({ ...defaultTypes, ...prev }))
  }, [defaultTypes, setClimbTypes])

  const toggleType = (key: keyof ClimbDisciplineRecord) => {
    setClimbTypes(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <TableView divider>
      <Toggle label="Sport" checked={climbTypes.sport ?? false} onClick={() => toggleType('sport')} />
      <Toggle label="Trad" checked={climbTypes.trad ?? false} onClick={() => toggleType('trad')} />
      <Toggle label="Top rope" checked={climbTypes.tr ?? false} onClick={() => toggleType('tr')} />
      <Toggle label="Bouldering" checked={climbTypes.bouldering ?? false} onClick={() => toggleType('bouldering')} />
    </TableView>
  )
}

export default DisciplineGroup
