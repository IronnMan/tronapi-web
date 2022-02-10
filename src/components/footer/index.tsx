import { DefaultFooter } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { LINKS } from '@/configs/links';
import { GithubOutlined } from '@ant-design/icons';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { name }: any = initialState?.settings;
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${name}`}
      links={[
        {
          key: 'api',
          title: '接口文档',
          href: LINKS.API,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: LINKS.GITHUB,
          blankTarget: true,
        },
        {
          key: 'faq',
          title: '常见问题',
          href: LINKS.FAQ,
          blankTarget: true,
        },
      ]}
    />
  );
};
