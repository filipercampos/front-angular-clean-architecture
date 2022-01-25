module.exports = () => {
  const data = {
    'access-token': [],
    'refresh-token': [],
    users: [],
    drivers: [],
  };

  authData(data);

  userData(data);

  driverData(data);

  return data;
};
function authData(data) {
  data['access-token'].push({
    id: 1,
    username: 'test',
    password: '123',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwic2VuaGEiOiIxMjMifQ.TJJ3WaWIVTOmjUCMZ39d33yKCjl068k0wNyK0_A86PI',
  });
  data['refresh-token'].push({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwic2VuaGEiOiIxMjMifQ.TJJ3WaWIVTOmjUCMZ39d33yKCjl068k0wNyK0_A86PI',
  });
}
function userData(data) {
  data.users.push({
    id: 1,
    username: 'test',
    password: '123',
    email: 'test@mail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwic2VuaGEiOiIxMjMifQ.TJJ3WaWIVTOmjUCMZ39d33yKCjl068k0wNyK0_A86PI',
  });
}

function driverData(data) {
  let j = 1;
  for (let i = 1; i < 41; i++) {
    let random = Math.random().toString();
    let randomCnh = random.substring(2, 9);
    let randomCpf = random.substring(2, 13);
    let now = new Date();
    const randomDate = new Date(now.getFullYear() - 30 + j, now.getMonth(), now.getDate());
    if (i % 2 == 0) {
      randomDate.setDate(randomDate.getDate() + 1);
      randomDate.setFullYear(randomDate.getFullYear() + 1);
    } else {
      randomDate.setDate(randomDate.getDate() + 3);
      randomDate.setFullYear(randomDate.getFullYear() + 3);
    }
    const category = i % 2 == 0 ? 'AB' : 'B';
    let month = now.getMonth();
    if (now.getMonth() + j > 11) {
      month = '01';
    } else {
      j++;
      month = now.getMonth() + j < 10 ? `0${now.getMonth() + j}` : now.getMonth() + j;
    }
    const expires_at = `${now.getFullYear()}-${month}-${now.getDate()}T00:00:00+00:00`;
    const birth_date = `${randomDate.getFullYear()}-${month}-${randomDate.getDate()}`;

    data.drivers.push({
      id: 1,
      name: `Motorista ${i}`,
      birth_date: birth_date,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      enable: i % 2 == 0,
      phone: '319123456789',
      address: {
        name: 'Home',
        state: 'Minas Gerais',
        country: 'BR',
        neighborhood: 'CENTRO',
        city: 'Belo Horizonte',
        street_number: 150,
        complement: 'APTO',
        postal_code: '35230-350',
        street_name: `Rua ${i}`,
      },
      documents: [
        {
          expires_at: expires_at,
          country: 'BR',
          number: i % 2 == 0 ? randomCpf : randomCnh,
          doc_type: i % 2 == 0 ? 'CPF' : 'CNH',
          category: i % 2 == 0 ? null : category,
        },
      ],
    });
  }
}
