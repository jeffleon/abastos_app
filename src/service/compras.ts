import { Service } from 'typedi';

@Service()
class ExampleInjectedService {
    printMessage() {
      console.log('I am alive!');
    }
}

export default ExampleInjectedService;