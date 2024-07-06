import { DynamicModule, FactoryProvider, Module, Provider } from '@nestjs/common'
import { S3ModuleAsyncOptions, S3ModuleOptions, S3ModuleOptionsFactory } from '@s3/s3.interfaces'
import { S3_CONNECTION, S3_OPTIONS } from '@s3/s3.constants'
import { createS3Connection } from '@s3/utils'
import { S3Service } from '@s3/s3.service'

@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  public static forRoot(options: S3ModuleOptions): DynamicModule {
    const s3OptionsProvider: Provider = {
      provide: S3_OPTIONS,
      useValue: options,
    }

    const s3ConnectionProvider: Provider = {
      provide: S3_CONNECTION,
      useValue: createS3Connection(options),
    }

    return {
      module: S3Module,
      providers: [s3OptionsProvider, s3ConnectionProvider, S3Service],
      exports: [s3OptionsProvider, s3ConnectionProvider, S3Service],
    }
  }

  public static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule {
    const s3ConnectionProvider: FactoryProvider = {
      provide: S3_CONNECTION,
      useFactory(options: S3ModuleOptions) {
        return createS3Connection(options)
      },
      inject: [S3_OPTIONS],
    }

    return {
      module: S3Module,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), s3ConnectionProvider, S3Service],
      exports: [s3ConnectionProvider, S3Service],
    }
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: S3ModuleAsyncOptions): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }

    return [this.createAsyncOptionsProvider(options), { provide: options.useClass, useClass: options.useClass }]
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: S3ModuleAsyncOptions): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: S3_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: S3_OPTIONS,
      async useFactory(optionsFactory: S3ModuleOptionsFactory): Promise<S3ModuleOptions> {
        return optionsFactory.createS3ModuleOptions()
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
