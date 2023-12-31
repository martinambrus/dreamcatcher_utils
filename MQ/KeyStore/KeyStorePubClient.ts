import { KeyStoreClientBase } from './KeyStoreClientBase.js';
import { ILogger } from './Interfaces/ILogger.js';
import { IKeyStorePub } from './Interfaces/IKeyStorePub.js';

/**
 * Publishing variant of the key store class.
 */
export class KeyStorePubClient extends KeyStoreClientBase implements IKeyStorePub {

  /**
   * Stores a logger class instance.
   *
   * @param { ILogger } logger The logger class instance.
   * @constructor
   */
  constructor( logger: ILogger ) {
    super( 'Pub', logger );
  }

  /**
   * A proxy for KeyStore->get().
   *
   * @param { string } key The key for which we want to retrieve a value.
   */
  public async get( key: string ): Promise<string> {
    return this.client.get( key );
  }

  /**
   * A proxy for KeyStore->set().
   *
   * @param { string } key   The key for which we want to set a value.
   * @param { string } value The value we want to set.
   */
  public async set( key: string, value: any ): Promise<string> {
    return this.client.set( key, value );
  }

  /**
   * A proxy for KeyStore->del().
   *
   * @param { string } key The key we want to remove.
   */
  public async delete( key: string ): Promise<number> {
    return this.client.del( key );
  }

  /**
   * A proxy for KeyStoreClass->sadd().
   *
   * @param { string } set_name The key for a set we want to add data to.
   * @param { string } value    The value we want to add to a set.
   */
  public async sadd( set_name: string, value: any ): Promise<number> {
    return this.client.sadd( set_name, value );
  }

  /**
   * A proxy for KeyStore->srem().
   *
   * @param { string } set_name The set name from where we want to remove data.
   * @param { string } value    The value we want to remove from the set.
   */
  public async sdelete( set_name: string, value: any ): Promise<number> {
    return this.client.srem( set_name, value );
  }

  /**
   * A proxy for KeyStore->smembers().
   *
   * @param { string } set_name The set name for which we want to retrieve members.
   */
  public async smembers( set_name: string ): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      try {
        this.client.smembers( set_name, ( err, members ) => {
          if ( err ) {
            reject( err );
          } else {
            resolve( members );
          }
        } );
      } catch ( err ) {
        reject( err );
      }
    });
  }

  /**
   * A proxy for KeyStore->publish()
   *
   * @param { string } channel Channel into which we want to publish a message.
   * @param { string } message The message we want to publish.
   */
  public async publish( channel: string, message: string ): Promise<number> {
    return this.client.publish( channel, message );
  }

}