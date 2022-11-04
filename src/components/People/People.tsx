import {useEffect, useState} from 'react'
import { Table, Space, Input, Modal, Button, Empty } from 'antd';
import { fetchPeople, fetchFiltered } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'

const { Search } = Input;

function People() {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [peopleFiltered, setPeopleFiltered] = useState<PersonType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  //
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  //
  const [isModalVisible, setVisible] = useState(false);
  const [selectedPerson, setPerson] = useState<PersonType|undefined>(undefined);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Height(cm)',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Mass(kg)',
      dataIndex: 'mass',
      key: 'mass',
    },
    {
      title: 'Hair Color',
      dataIndex: 'hair_color',
      key: 'hair_color',
    },
    {
      title: 'Skin Color',
      dataIndex: 'skin_color',
      key: 'skin_color',
    },
    {
      title: 'Eye Color',
      dataIndex: 'eye_color',
      key: 'eye_color',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text: any) => (
        <div>{text === "male" ? "🙎🏻‍♂️" : ( text === "female" ? "🙎🏻‍♀️" : "N/A")}</div>
      )
    },
    {
      title: "View Details",
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => {
              setPerson(record);
              setVisible(true)
            }
          }>View</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchPeople<{ count: number, results: PersonType[] }>(`${page}`)
      .then(peopleResponse => {
        setTotal(peopleResponse.count);
        setPeople(peopleResponse.results);
        setLoading(false);
      });
  }, [page]);

  const onSearch = (input: string) => {
    fetchFiltered<{ count: number, results: PersonType[] }>(`${input.toLowerCase()}`)
      .then(filteredResponse => {
        setTotal(filteredResponse.count);
        setPeople(filteredResponse.results);
        setLoading(false);
      });
  };

  const hideModal = () => {
    setVisible(false);
    setPerson(undefined);
  };

  return (
    <div style={{padding:"25px"}}>
      <Search width={"100%"}
        placeholder="Search..."
        allowClear
        style={{ marginBottom: 30 }}
        onSearch={onSearch}
        onChange={(e) =>onSearch(e.target?.value)}
      />
      <Table
        locale={{ emptyText: (<Empty description="No Results"/>)  }}
        columns={columns}
        key={"name"}
        dataSource={searching ? peopleFiltered :  people}
        pagination={{position: ['bottomRight'], total: total, showSizeChanger: false}}
        loading={loading}
        onChange={conf => { conf.current && setPage(conf.current) }}
      />
      <Modal
          title="View Details"
          style={{ top: 20 }}
          visible={isModalVisible}
          width={"90%"}
          footer={null}
          onOk={hideModal}
          onCancel={hideModal}
          destroyOnClose={true}
        >
          <Person person={selectedPerson} />
        </Modal>
    </div>
  )
}

export default People
