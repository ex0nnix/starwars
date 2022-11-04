import { Descriptions, Skeleton, Rate, Typography, Space } from 'antd';
import { PersonType } from '../../types';
import Film from '../Film';
import Species from '../Species';

const { Text } = Typography;

interface PersonProps {
  person: PersonType | undefined
}

function Person({ person }: PersonProps) {
  if(!person){
    return <Skeleton />
  }
  return (
    <div>
      <Descriptions title={person.name + " Info"}>
      <Descriptions.Item><Text strong>Height:</Text>&nbsp;&nbsp;{person.height}</Descriptions.Item>
      <Descriptions.Item><Text strong>Weight:</Text>&nbsp;&nbsp;{person.mass}</Descriptions.Item>
      <Descriptions.Item><Text strong>Eye Color:</Text>&nbsp;&nbsp;{person.eye_color}</Descriptions.Item>
      <Descriptions.Item><Text strong>Hair Color:</Text>&nbsp;&nbsp;{person.hair_color}</Descriptions.Item>
      <Descriptions.Item><Text strong>Skin Color:</Text>&nbsp;&nbsp;{person.skin_color}</Descriptions.Item>
      <Descriptions.Item><Text strong>Gender:</Text>&nbsp;&nbsp;{person.gender}</Descriptions.Item>
      <Descriptions.Item><Text strong>Birth Year:</Text>&nbsp;&nbsp;{person.birth_year}</Descriptions.Item>
      <Descriptions.Item><Text strong>Vehicles:</Text>&nbsp;&nbsp;{person.vehicles.length}</Descriptions.Item>
      <Descriptions.Item><Text strong>Starships:</Text>&nbsp;&nbsp;<Rate disabled defaultValue={person.starships.length} /></Descriptions.Item>
    </Descriptions>
    <br />
    <h4>Films</h4>
      {person.films && person.films.map(film => <Film filmUrl={film} />)}
    <br />
    <h4>Species</h4>
      {person.species && person.species.map(s => <Species speciesUrl={s} />)}
      {person.species.length === 0 && <p>No species found</p>}
    </div>
  )
}

export default Person
