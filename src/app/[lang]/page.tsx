'use client';
import { ReactNode,useEffect,useState } from 'react';
import Image from 'next/image';
import { useParams,useRouter,useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Box,Button,Checkbox,Divider,Fade,FormControlLabel,IconButton,
  Grid,Link,Slide,TextField,Typography,useMediaQuery,InputAdornment
} from '@mui/material';
import { Icon } from '@iconify/react';
import { InView,useInView } from 'react-intersection-observer';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { theme } from '@/config/mui-theme';
import { dateToInt,getRandomInt,scrollToId } from '@/utils/functions';
import { companyName,sourcesData } from '@/utils/constants';
import { CopyrightText, LanguageSelector } from '@/components/client';

function LoginForm() : ReactNode {
  const router = useRouter();
  const lang = useParams().lang;
  const i18n = useTranslations('loginPage.labels.login');
  const searchParams = useSearchParams();
  
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>(undefined);
  const [ isPasswordVisible, setPasswordVisibility ] = useState<boolean>(false);
  const [ isPasswordInputFocused, setPasswordInputFocus ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const oid: string | null = searchParams.get('redirect');
  let newSearchParams: URLSearchParams | undefined = undefined;
  if(oid){
    newSearchParams = new URLSearchParams();
    newSearchParams.set('oid', oid);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginSuccessful = true;

    if(loginSuccessful){
      const token = 'placeholder';
      if(data.get('rememberMe')){
        localStorage.setItem('token', token);
      }
      else {
        sessionStorage.setItem('token', token);
      }
      router.replace(`/${lang}/home`);
      if(newSearchParams) router.push(`/${lang}/report?${newSearchParams}`);
    }
    else {
      setErrorMessage('Invalid credentials.');
    }
  };

  useEffect(() => {
    router.prefetch(`/${lang}/home`);
    if(newSearchParams){
      router.prefetch(`/${lang}/report?${newSearchParams}`);
    }
  }, [router, lang, newSearchParams]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography component="h2" variant="h5" className="text-center">
        {i18n('title')}
      </Typography>
      <TextField
        required
        fullWidth
        id="email"
        name="email"
        label={i18n('emailAddress')}
        variant="outlined"
        margin="normal"
        autoComplete="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField required fullWidth
        id="password"
        name="password"
        label={i18n('password')}
        variant="outlined"
        margin="normal"
        type={isPasswordVisible ? "text" : "password"}
        autoComplete="current-password"
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton
                title={isPasswordVisible ? i18n('hidePassword') : i18n('showPassword')}
                aria-label={i18n('showHidePassword')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  setPasswordVisibility((currentPasswodVisibility) => !currentPasswodVisibility);
                }}
              >
                {<Icon
                  className={`${isPasswordInputFocused ? 'text-primary' : 'text-foreground/45'}`}
                  icon={isPasswordVisible ? "material-symbols:visibility-off-outline" : "material-symbols:visibility-outline"}
                />}
              </IconButton>
            </InputAdornment>
          )
        }}
        onFocus={() => setPasswordInputFocus(true)}
        onBlur={() => setPasswordInputFocus(false)}
        onChange={(event) => setPassword(event.target.value)}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" name="rememberMe"/>}
        label={i18n('rememberMe')}
      />
      { errorMessage && 
        <div className="flex flex-row items-center mt-4">
          <Icon icon="mdi:info-outline" width={18} className="mr-1 text-red-600"/>
          <Typography variant="body1" className="text-red-600">{errorMessage}</Typography>
        </div>
      }
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="mt-6 mb-4"
        disabled={password.length < 8 || !(/^\S+@\S+$/.test(email))}
      >
        {i18n('title')}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            {i18n('forgotPassword')}
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {i18n('signUp')}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

function Banner(){
  const i18n = useTranslations('loginPage.labels.banner');
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const [viewCount, setViewCount] = useState<number>(0);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <Grid ref={ref} item component="article" id="banner-visuals" xs={12} lg={8} xl={9}
      className="box-border px-4 pt-4"
    >
      <InView as="div"
        className="flex flex-col px-10 items-center h-full
        drop-shadow-md text-white text-center" 
        onChange={(inView, _) => {
          if(inView){
            setViewCount(viewCount+1);
          }
        }}
      >
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <div className="flex flex-col items-center">
            { isMedium ? 
              <Image
                width={100}
                height={65}
                src="/logo_dark.svg"
                alt="Logo"
                className="mt-3 w-auto h-[80px]"
                priority={true}
              /> : <></>
            }
            <Typography component="h1" variant="h3" className="mb-3 mt-8 font-bold break-words xl:px-20">
              {i18n('title').toLocaleUpperCase()}
            </Typography>
            <Divider
              className="select-none mt-1 mb-2 w-[100px]"
              sx={{
                "&::before, &::after": {
                  borderColor: "white",
                },
              }}
            >
            <Icon icon="fluent:leaf-two-16-regular" width={22}/>
            </Divider>
            <Typography component="p" variant="h6">
              {companyName.toLocaleUpperCase()}
            </Typography>
          </div>
        </Slide>
        <div className="flex-grow"></div>
        {
          isSmall ? <div className="h-10"></div> : 
          <Slide direction="down" in={viewCount > 0} appear={false} timeout={800}>
            <Grid container rowGap={6} className="px-2 py-8">
              <Grid component="article" item xs={12} sm={6} className="px-10">
                <Icon
                  icon="healthicons:agriculture-outline" width={60}
                  className="border-solid border-3 rounded-xl p-1 mb-4"
                />
                <Typography component="h3" variant="h4" className="mb-2 break-words hyphens-auto">
                  {i18n('deforestationReports')}
                </Typography>
                <Typography component="p" variant="body1" className="max-w-96 m-auto text-md">
                  {i18n('deforestationReportsDescription')}
                </Typography>
              </Grid>
              <Grid component="article" item xs={12} sm={6} className="px-10">
                <Icon
                  icon="carbon:map-boundary-vegetation" width={60}
                  className="border-solid border-3 rounded-xl p-1 mb-4"
                />
                <Typography component="h3" variant="h4" className="mb-2 break-words hyphens-auto">
                  {i18n('geopositioning')}
                </Typography>
                <Typography component="p" variant="body1" className="max-w-96 m-auto text-md">
                  {i18n('geopositioningDescription')}
                </Typography>
              </Grid>
            </Grid>
          </Slide>
        }
        <div className="flex-grow xs:mb-8"></div>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <Link className="text-white no-underline cursor-pointer"
            onClick={() => scrollToId('#about')}
          >
            <div className="mb-1 select-none">
              {i18n('learnMore').toUpperCase()}
            </div>
            <div className="animate-pulse xs:mb-4 lg:mb-0">
              <Icon icon="carbon:chevron-down" width={40} height={40} color="white"/>
            </div>
          </Link>
        </Slide>
      </InView>
    </Grid>
  );
}

function SourcesGallery() : ReactNode {
  const i18n = useTranslations('reportPage.labels.reportsPanel');
  let sources: {image: string, institution: string, url: string}[] = [
    'SITUACAO_CAR',
    'EMBARGO_IBAMA_DOCUMENT',
    'ALERTA_MAPBIOMAS',
    'PRODES_ANY',
    'EMBARGO_ICMBIO_DOCUMENT',
    'TERRAS_INDIGENAS',
    'QUILOMBOS',
    'UNIDADES_CONSERVACAO',
    'EMBARGO_SLAVERIES_DOCUMENT',
    'EMBARGO_SEMA'
  ].map(type => {
    return {
      image: sourcesData[type].image,
      institution: i18n(`protocolItems.${type}.institution`),
      url: sourcesData[type].url,
    }
  });

  return (
    <div className="my-8 flex flex-wrap gap-4 justify-center">
      {
        sources.map((source,index) => (
          <a key={index} href={source.url} target="blank">
            <Image
              width={100}
              height={65}
              src={`/${source.image}`}
              alt={`${source.institution} - Logo`}
              title={source.institution}
              className="inline w-auto h-[90px] hover:scale-110 duration-300
              bg-white p-4 drop-shadow-sm hover:bg-[#fff6ee]"
            />
          </a>
        ))
      }
    </div>
  );
}

function AboutSection() : ReactNode {
  const i18n = useTranslations('loginPage.labels.about');

  const [viewCount, setViewCount] = useState<number>(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const deforestationDetails = i18n('deforestation.details').split("\n");
  const eudrDetails = i18n('eudr.details').split("\n");
  const platformDetails = i18n('platform.details').split("\n");

  return (
    <section id="about" 
      className="bg-secondary text-primaryDark pattern-autumn-orange-500/5
      overflow-hidden p-14 xs:p-8"
    >
      <InView onChange={(inView, _) => 
        {
          if(inView){
            setViewCount(viewCount+1);
          }
        }
      }>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
        <Typography component="h2" variant="h3" className="text-center font-bold mb-10 mt-16 break-words hyphens-auto">
          {i18n('title').toLocaleUpperCase()}
        </Typography>
        </Slide>
        <div ref={ref}
          className="max-w-[1000px] m-auto flex flex-col gap-12 justify-center md:p-12 sm:p-4 mb-8"
        >
          <Slide direction="right" in={viewCount > 0} appear={false} timeout={800}>
            <article>
              <Typography component="h3" variant="h5" className="mb-2 font-bold">
                {i18n('eudr.title')}
              </Typography>
              {
                eudrDetails.map((paragraph, index) => (
                  <Typography key={index} variant="body1" className="text-justify mb-3">
                    {paragraph}
                  </Typography>
                ))
              }
            </article>
          </Slide>
          <article>
            <Slide direction="left" in={viewCount > 0} appear={false} timeout={800}>
              <div>
                <Typography component="h3" variant="h5" className="mb-2 font-bold">
                  {i18n('deforestation.title')}
                </Typography>
                <Typography variant="body1" component="p" className="text-justify mb-3">
                  {deforestationDetails[0]}
                </Typography>
              </div>
            </Slide>
            <Fade in={viewCount > 0} appear={false} timeout={1800}>
              <div>
                <SourcesGallery/>
              </div>
            </Fade>
            <Slide direction="left" in={viewCount > 0} appear={false} timeout={800}>
              <div>
                {
                  deforestationDetails.slice(1).map((paragraph, index) => (
                    <Typography key={index} component="p" variant="body1" className="text-justify mb-3">
                      {paragraph}
                    </Typography>
                  ))
                }
              </div>
            </Slide>
          </article>
          <Slide direction="right" in={viewCount > 0} appear={false} timeout={800}>
            <article>
              <Typography component="h3" variant="h5" className="mb-2 font-bold">
                {i18n('platform.title')}
              </Typography>
              {
                platformDetails.map((paragraph, index) => (
                  <Typography key={index} component="p" variant="body1" className="text-justify mb-3">
                    {paragraph}
                  </Typography>
                ))
              }
            </article>
          </Slide>
          <Slide direction="left" in={viewCount > 0} appear={false} timeout={800}>
            <article>
              <Typography component="h3" variant="h5" className="mb-2 font-bold">
                {i18n('access.title')}
              </Typography>
              <Typography component="p" variant="body1" className="text-justify">
                {i18n('access.details')}
              </Typography>
            </article>
          </Slide>
        </div>
      </InView>
    </section>
  );
}

function LoginAside() : ReactNode {
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const [viewCount, setViewCount] = useState<number>(0);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <Grid ref={ref} component="aside" id="login" item xs={12} lg={4} xl={3}
      className="lg:p-0 xs:px-4 xs:pb-6 lg:flex"
    >
      <InView as="div"
        onChange={(inView, _) => {
          if(inView){
            setViewCount(viewCount+1);
          }
        }}
        className="bg-white pb-6 px-8 pt-8 flex-col items-center
        xs:rounded-xl xs:drop-shadow-md
        lg:rounded-none lg:drop-shadow-none lg:flex lg:pt-4"
      >
        { isMedium ? 
          <></> :
          <Slide direction="down" in={viewCount > 0} appear={false} timeout={400}>
            <Image
              width={100}
              height={65}
              src="/logo.svg"
              alt="Logo"
              className="inline w-auto h-[80px] mt-8"
              priority={true}
            />
          </Slide>
        }
        <div className="grow-[3]"></div>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={600}>
          <div className="mb-12 lg:mb-0">
            <LoginForm/>
          </div>
        </Slide>
        <div className="grow-[5]"></div>
        <Slide direction="down" in={viewCount > 0} appear={false} timeout={400}>
          <div className="flex flex-col items-center">
            <LanguageSelector/>
          </div>
        </Slide>
      </InView>
    </Grid>
  );
}

function Footer() : ReactNode {
  return (
    <footer id="footer" className="bg-stone-800 py-4 flex text-white items-center justify-center">
      <CopyrightText/>
    </footer>
  );
}

function FrontSection() : ReactNode {
  return (
    <Grid container component="section" id="front-section"
      className="lg:min-h-[100vh] box-border bg-cover
      bg-center bg-no-repeat bg-tertiary grow relative"
    >
      <Image
        src={`/cafe-${getRandomInt(0, 9, dateToInt())}.jpg`}
        alt="Logo"
        fill={true}
        sizes="100vw"
        className="object-cover"
      />
      <div className="bg-black/40 w-full h-full absolute top-0 left-0"></div>
      <Banner/>
      <LoginAside/>
    </Grid>
  );
}

export default function LoginPage() : ReactNode {
  return(
    <main>
      <Scrollbars universal style={{ width: '100vw', height: '100vh' }}>
        <FrontSection/>
        <AboutSection/>
        <Footer/>
      </Scrollbars>
    </main>
  );
}